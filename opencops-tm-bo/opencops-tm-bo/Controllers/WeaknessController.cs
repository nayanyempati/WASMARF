using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Countermeasures;
using opencops_tm_bo.Models.Weakness;

namespace opencops_tm_bo.Controllers
{
    [Route("api/weakness")]
    [ApiController]
    public class WeaknessController : ControllerBase
    {
        public readonly Messages _messages = new Messages();
        private readonly Cryptography _cryptography = new Cryptography();
        private readonly dbCon _dbcon = new dbCon();
        private readonly IUser _user;
        private readonly IWeakness _weakness;
        private readonly ILogger<WeaknessController> _logger;
        private readonly JWTTokenService _jWTTokenService = new JWTTokenService();

        public WeaknessController(dbCon dbcon, IUser user, ILogger<WeaknessController> logger, IWeakness weakness)
        {
            _dbcon = dbcon;
            _user = user;
            _logger = logger;
            _weakness = weakness;
        }


        [HttpGet("list")]
        public async Task<dynamic> Weakness()
        {
            return await _weakness.Weakness();

        }

        [HttpGet("listforcountermeasures")]
        public async Task<dynamic?> ListForCountermeasures()
        {
            return await _weakness.ListForCountermeasures();
        }

        [HttpGet("details/{weaknessid}")]
        public async Task<Weakness?> Details(int weaknessid)
        {
            return await _weakness.Details(weaknessid);
        }


        [HttpPost("create")]
        public async Task<ResponseModel> AddWeakness([FromBody] CreateWeaknessModel model)
        {
            return await _weakness.AddWeakness(model);
        }

    }
}
