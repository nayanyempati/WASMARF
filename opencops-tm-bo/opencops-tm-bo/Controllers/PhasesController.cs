using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Phases;

namespace opencops_tm_bo.Controllers
{
    [Route("api/phases")]
    [ApiController]
    public class PhasesController : ControllerBase
    {
        public readonly Messages _messages = new Messages();
        private readonly Cryptography _cryptography = new Cryptography();
        private readonly dbCon _dbcon = new dbCon();
        private readonly IUser _user;
        private readonly IPhases _phases;
        private readonly ILogger<PhasesController> _logger;
        private readonly JWTTokenService _jWTTokenService = new JWTTokenService();

        public PhasesController(dbCon dbcon, IUser user, ILogger<PhasesController> logger, IPhases phases)
        {
            _dbcon = dbcon;
            _user = user;
            _logger = logger;
            _phases = phases;
        }

        [HttpGet("list")]
        public async Task<IList<Phase>> Phases()
        {
            return await _phases.List();
        }

        [HttpPost("create")]
        public async Task<ResponseModel> CreatePhase([FromBody] CreatePhaseModel model)
        {
            return await _phases.CreatePhase(model);
        }

        [HttpGet("details/{phaseid}")]
        public async Task<Phase?> PhaseDetails(int phaseid)
        {
            return await _phases.PhaseDetails(phaseid);
        }
    }
}
