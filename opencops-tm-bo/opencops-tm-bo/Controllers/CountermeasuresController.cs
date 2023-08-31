using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Countermeasures;
using opencops_tm_bo.Models.Library;

namespace opencops_tm_bo.Controllers
{
    [Route("api/countermeasures")]
    [ApiController]
    public class CountermeasuresController : ControllerBase
    {
        public readonly Messages _messages = new Messages();
        private readonly Cryptography _cryptography = new Cryptography();
        private readonly dbCon _dbcon = new dbCon();
        private readonly IUser _user;
        private readonly ICountermeasures _countermeasures;
        private readonly ILogger<CountermeasuresController> _logger;
        private readonly JWTTokenService _jWTTokenService = new JWTTokenService();

        public CountermeasuresController(dbCon dbcon, IUser user, ILogger<CountermeasuresController> logger, ICountermeasures countermeasures)
        {
            _dbcon = dbcon;
            _user = user;
            _logger = logger;
            _countermeasures = countermeasures;
        }


        [HttpGet("list")]
        public async Task<dynamic> Countermeasure()
        {
            return await _countermeasures.Countermeasure();

        }


        [HttpGet("details/{countermeasureid}")]
        public async Task<dynamic?> Details(int countermeasureid)
        {
            return await _countermeasures.Details(countermeasureid);
        }


        [HttpGet("countermasuresbyid/{countermeasureid}")]
        public async Task<dynamic?> CountermeasuresById(int countermeasureid)
        {
            return await _countermeasures.CountermeasuresById(countermeasureid);
        }

        [HttpGet("listcountermeasuresbyweaknessid/{weaknessid}")]
        public async Task<dynamic> ListCountermeasuresByWeaknessId(int weaknessid)
        {
            return await _countermeasures.ListCountermeasuresByWeaknessId(weaknessid);
        }

        [HttpPost("create")]
        public async Task<ResponseModel> AddCountermeasure([FromBody] AddCountermeasureModel model)
        {
            return await _countermeasures.Addcountermeasure(model);
        }

    }
}
