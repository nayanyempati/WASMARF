using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Models.Token;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace opencops_tm_bo.Helper
{
    public class JWTTokenService
    {
        public JWTToken GenerateToken(User user)
        {
            var config = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
            var appSecret = config["AppSecret"];
            if (appSecret == null)
            {
                return new JWTToken { };
            }

            var key = Encoding.ASCII.GetBytes(appSecret);
            var securityKey = new SymmetricSecurityKey(key);
            var accessTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                    {

            new Claim(ClaimTypes.Name, user.UserId.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.AuthenticationMethod, "")
                    }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature)
            };

            var refreshTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                    {
                  new Claim(ClaimTypes.Name, user.UserId.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.AuthenticationMethod, "")
                    }),
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature)
            };
            var handler = new JwtSecurityTokenHandler();
            var accessToken = new JwtSecurityToken();
            var refreshToken = new JwtSecurityToken();

            accessToken = handler.CreateJwtSecurityToken(accessTokenDescriptor);
            string finalAccessToken = handler.WriteToken(accessToken);

            refreshToken = handler.CreateJwtSecurityToken(refreshTokenDescriptor);
            string finalRefreshToken = handler.WriteToken(refreshToken);

            var token = new JWTToken
            {
                AccessToken = finalAccessToken,
                RefreshToken = finalRefreshToken
            };


            return token;
        }
    }
}
