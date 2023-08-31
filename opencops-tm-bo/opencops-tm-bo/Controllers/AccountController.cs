using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Account;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Library;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace opencops_tm_bo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public readonly Messages _messages = new Messages();
        private readonly Cryptography _cryptography = new Cryptography();
        private readonly dbCon _dbcon = new dbCon();
        private readonly IAccount _account;
        private readonly ILogger<AccountController> _logger;
        private readonly JWTTokenService _jWTTokenService = new JWTTokenService();
        private readonly IUser _user;

        public AccountController(dbCon dbcon, IAccount account, ILogger<AccountController> logger, IUser user)
        {
            _dbcon = dbcon;
            _account = account;
            _logger = logger;
            _user = user;
        }
        //REGISTER

        [HttpPost("register"), AllowAnonymous]
        public async Task<ResponseModel> Register([FromBody] Register model)
        {
            if (!ModelState.IsValid)
            {
                return new ResponseModel { Message = _messages.REQUIRED_FIELDS_MISSING, Status = _messages.FAILED, StatusCode = 200 };
            }
            return await _account.Register(model);
        }

        //LOGIN
        [HttpPost("login"), AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new ResponseModel { Message = _messages.REQUIRED_FIELDS_MISSING, Status = _messages.FAILED, StatusCode = 200 });
            }
            var details = await _account.CheckAuth(model);
            if (details == null)
            {
                return Ok(new ResponseModel { Message = _messages.INVALID_CREDENTIALS, Status = _messages.FAILED, StatusCode = 200 });
            }
            var token = _jWTTokenService.GenerateToken(details);
            return Ok(token);

        }


        [HttpGet("token"), Authorize]
        public async Task<IActionResult> Token()
        {
            var identity = User.Identity as ClaimsIdentity;
            string? userId = identity?.Name;
            var details = await _account.GetByUserId(Convert.ToInt32(userId));
            var token = _jWTTokenService.GenerateToken(details);
            return Ok(token);
        }


        [HttpGet("do")]
        public async void Do()
        {
            string jsonFileName = "how.json"; // Replace with your JSON file name
            string projectRoot = Directory.GetCurrentDirectory();
            string jsonFilePath = Path.Combine(projectRoot, jsonFileName);
            try
            {
                string jsonText = System.IO.File.ReadAllText(jsonFilePath);
                JArray jsonArray = JArray.Parse(jsonText); // If your JSON contains an array

                foreach (JObject jsonObject in jsonArray)
                {
                    string universal_id = (string)jsonObject["universal_id"];
                    string phase = (string)jsonObject["phase"];

                    var countemeasures = _dbcon.Countermeasures.FirstOrDefault(x=>x.CountermeasureToken==universal_id);
                    if(countemeasures != null)
                    {
                        countemeasures.Phase = phase;
                        _dbcon.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        }


    }
}
