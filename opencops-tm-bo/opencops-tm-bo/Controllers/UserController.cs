using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using System.Security.Claims;

namespace opencops_tm_bo.Controllers
{
    [Route("api/user")]
    [ApiController, Authorize]
    public class UserController : ControllerBase
    {
        public readonly Messages _messages = new Messages();
        private readonly Cryptography _cryptography = new Cryptography();
        private readonly dbCon _dbcon = new dbCon();
        private readonly IUser _user;
        private readonly ILogger<UserController> _logger;
        private readonly JWTTokenService _jWTTokenService = new JWTTokenService();

        public UserController(dbCon dbcon, IUser user, ILogger<UserController> logger)
        {
            _dbcon = dbcon;
            _user = user;
            _logger = logger;
        }

        [HttpGet("details")]
        public async Task<dynamic?> Details()
        {
            var identity = User.Identity as ClaimsIdentity;
            string? userId = identity?.Name;
            return await _user.GetByUserId(Convert.ToInt32(userId));
        }

    }
}
