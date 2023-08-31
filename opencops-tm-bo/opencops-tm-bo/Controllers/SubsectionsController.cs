using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Subsections;

namespace opencops_tm_bo.Controllers
{
    [Route("api/subsections")]
    [ApiController]
    public class SubsectionsController : ControllerBase
    {
        public readonly Messages _messages = new Messages();
        private readonly Cryptography _cryptography = new Cryptography();
        private readonly dbCon _dbcon = new dbCon();
        private readonly IUser _user;
        private readonly ISubsections _subsections;
        private readonly ILogger<SubsectionsController> _logger;
        private readonly JWTTokenService _jWTTokenService = new JWTTokenService();

        public SubsectionsController(dbCon dbcon, IUser user, ILogger<SubsectionsController> logger, ISubsections subsections)
        {
            _dbcon = dbcon;
            _user = user;
            _logger = logger;
            _subsections = subsections;
        }

        [HttpGet("list/{sectionid}")]
        public async Task<IList<SurveySubsection>> Subsections(int sectionid)
        {
            return await _subsections.Subsections(sectionid);
        }

        [HttpPost("create/{sectionid}")]
        public async Task<ResponseModel> CreateSubsection([FromBody] CreateSubsectionModel model, int sectionid)
        {
            return await _subsections.CreateSubsection(model, sectionid);
        }

        [HttpGet("view/{sectionid}/{subsectionid}")]
        public async Task<SurveySubsection?> View(int sectionid, int subsectionid)
        {
            return await _subsections.View(sectionid, subsectionid);
        }
    }
}
