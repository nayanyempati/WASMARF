using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Services;
using Serilog;
using Serilog.Exceptions;
using System.IO.Compression;
using System.Text;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddScoped<IAccount, AccountService>();
builder.Services.AddScoped<IProfiles, ProfilesServices>();
builder.Services.AddScoped<ISections, SectionsServices>();
builder.Services.AddScoped<ISubsections, SubsectionsServices>();
builder.Services.AddScoped<IQuestions, QuestionsServices>();
builder.Services.AddScoped<IComponents, ComponentsServices>();
builder.Services.AddScoped<IWeakness, WeaknessServices>();
builder.Services.AddScoped<IAnswers, AnswersServices>();
builder.Services.AddScoped<ICategories, CategoriersServices>();
builder.Services.AddScoped<ICountermeasures, CountermeasuresServices>();
builder.Services.AddScoped<IUser, UserService>();
builder.Services.AddScoped<IPhases, PhasesServices>();
builder.Services.AddScoped<IClassifications, ClassificationsServices>();
builder.Services.AddScoped<IRiskPolicies, RiskPoliciesServices>();
builder.Services.AddScoped<IProjects, ProjectsServices>();
builder.Services.AddScoped<IDashboard, DashboardService>();
builder.Services.AddControllers();

builder.Services.AddAuthentication(builder =>
{
    builder.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    builder.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    var key = builder.Configuration.GetSection("AppSecret");
    if (key.Value != null)
    {
        var keyBytes = Encoding.ASCII.GetBytes(key.Value);

        options.RequireHttpsMetadata = false;
        options.SaveToken = true;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
            ValidateIssuer = false,
            ValidateAudience = false,
        };

        options.Events = new JwtBearerEvents
        {
            OnTokenValidated = async context =>
            {
                if (context != null)
                {
                    var principal = context.Principal;
                    if (principal != null)
                    {
                        if (principal.Identity != null)
                        {
                            var userid = principal.Identity.Name;
                            var _claimIdentity = principal.Identities.Select(x => x.Claims).FirstOrDefault();
                            if (_claimIdentity != null)
                            {
                                var user = await context.HttpContext.RequestServices.GetRequiredService<IAccount>().GetByUserId(Convert.ToInt32(userid));
                                if (user != null)
                                {
                                    return;
                                }
                                context.Fail("Unauthorized");
                            }
                            context.Fail("Unauthorized");
                        }
                        context.Fail("Unauthorized");
                    }
                }


            },
            OnAuthenticationFailed = context =>
            {
                context.Fail("Unauthorized");
                return System.Threading.Tasks.Task.CompletedTask;
            }
        };
    }
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
});
builder.Services.AddResponseCompression();
builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Fastest;
});

builder.Services.Configure<GzipCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.SmallestSize;
});
builder.Services.AddMvc().AddJsonOptions(o =>
{
    o.JsonSerializerOptions.PropertyNamingPolicy = null;
    o.JsonSerializerOptions.DictionaryKeyPolicy = null;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<dbCon>(options =>
                   options.UseSqlServer(builder.Configuration.GetConnectionString("conn")));

builder.Services.AddCors();
Log.Logger = new LoggerConfiguration()
    .Enrich.WithExceptionDetails()
    .MinimumLevel.Debug()
    .WriteTo.File("Logs/.log", rollingInterval: RollingInterval.Day)
    .CreateLogger();
builder.Logging.ClearProviders();
builder.Logging.AddSerilog();
builder.Services.AddResponseCaching();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(corsPolicyBuilder =>
    {

        corsPolicyBuilder
        .WithOrigins("http://localhost:4200")
        .AllowAnyMethod()
        .SetIsOriginAllowed((host) => true)
         .AllowCredentials()
        .AllowAnyHeader();
    });
}
else
{
    app.UseCors(corsPolicyBuilder =>
    {

        corsPolicyBuilder
        .WithOrigins("https://app.secureway.io")
        .AllowAnyMethod()
        .SetIsOriginAllowed((host) => true)
         .AllowCredentials()
        .AllowAnyHeader();
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
