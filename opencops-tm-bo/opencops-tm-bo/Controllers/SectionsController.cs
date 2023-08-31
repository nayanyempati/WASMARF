using Microsoft.AspNetCore.Mvc;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Library;

namespace opencops_tm_bo.Controllers
{
    [Route("api/sections")]
    [ApiController]
    public class SectionsController : ControllerBase
    {
        public readonly Messages _messages = new Messages();
        private readonly Cryptography _cryptography = new Cryptography();
        private readonly dbCon _dbcon = new dbCon();
        private readonly IUser _user;
        private readonly ISections _sections;
        private readonly ILogger<SectionsController> _logger;
        private readonly JWTTokenService _jWTTokenService = new JWTTokenService();

        public SectionsController(dbCon dbcon, IUser user, ILogger<SectionsController> logger, ISections sections)
        {
            _dbcon = dbcon;
            _user = user;
            _logger = logger;
            _sections = sections;
        }

        [HttpGet("list")]
        public async Task<dynamic> Sections()
        {
            return await _sections.Sections();
        }

        [HttpPost("create")]
        public async Task<ResponseModel> CreateSection([FromBody] CreateSectionModel model)
        {
            return await _sections.CreateSection(model);
        }

        [HttpGet("view/{section_id}")]
        public async Task<SurveySection?> ViewSection(int section_id)
        {
            return await _sections.ViewSection(section_id);
        }


    }
}
