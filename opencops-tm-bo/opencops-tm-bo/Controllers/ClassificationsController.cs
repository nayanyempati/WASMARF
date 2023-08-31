using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Classifications;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Phases;

namespace opencops_tm_bo.Controllers
{
    [Route("api/classifications")]
    [ApiController]
    public class ClassificationsController : ControllerBase
    {
        public readonly Messages _messages = new Messages();
        private readonly Cryptography _cryptography = new Cryptography();
        private readonly dbCon _dbcon = new dbCon();
        private readonly IUser _user;
        private readonly IClassifications _classifications;
        private readonly ILogger<ClassificationsController> _logger;
        private readonly JWTTokenService _jWTTokenService = new JWTTokenService();

        public ClassificationsController(dbCon dbcon, IUser user, ILogger<ClassificationsController> logger, IClassifications classifications)
        {
            _dbcon = dbcon;
            _user = user;
            _logger = logger;
            _classifications = classifications;
        }
        [HttpGet("list")]
        public async Task<IList<Classification>> Classifications()
        {
            return await _classifications.List();
        }

        [HttpPost("create")]
        public async Task<ResponseModel> CreateClassification([FromBody] CreateClassificationModel model)
        {
            return await _classifications.CreateClassification(model);
        }

        [HttpGet("details/{classificationid}")]
        public async Task<Classification?> PhaseDetails(int classificationid)
        {
            return await _classifications.ClassificationDetails(classificationid);
        }

    }
}
