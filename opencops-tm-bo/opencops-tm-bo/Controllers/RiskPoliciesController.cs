using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Phases;
using opencops_tm_bo.Models.Riskpolicy;

namespace opencops_tm_bo.Controllers
{
    [Route("api/riskpolicies")]
    [ApiController]
    public class RiskPoliciesController : ControllerBase
    {
        public readonly Messages _messages = new Messages();
        private readonly Cryptography _cryptography = new Cryptography();
        private readonly dbCon _dbcon = new dbCon();
        private readonly IRiskPolicies _riskpolicies;
        private readonly ILogger<RiskPoliciesController> _logger;
        private readonly JWTTokenService _jWTTokenService = new JWTTokenService();

        public RiskPoliciesController(dbCon dbcon, IRiskPolicies riskpolicies, ILogger<RiskPoliciesController> logger)
        {
            _dbcon = dbcon;
            _logger = logger;
            _riskpolicies = riskpolicies;
        }

        [HttpGet("list")]
        public async Task<IList<RiskPolicy>> List()
        {
            return await _riskpolicies.List();
        }

        [HttpPost("create")]
        public async Task<ResponseModel> Create([FromBody] CreateRiskPolicyModel model)
        {
            return await _riskpolicies.Create(model);
        }

        [HttpGet("details/{riskpolicyid}")]
        public async Task<RiskPolicy?> Details(int phaseid)
        {
            return await _riskpolicies.Details(phaseid);
        }
    }
}
