using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Questions;

namespace opencops_tm_bo.Controllers
{
    [Route("api/questions")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        public readonly Messages _messages = new Messages();
        private readonly Cryptography _cryptography = new Cryptography();
        private readonly dbCon _dbcon = new dbCon();
        private readonly IUser _user;
        private readonly IQuestions _questions;
        private readonly ILogger<QuestionsController> _logger;
        private readonly JWTTokenService _jWTTokenService = new JWTTokenService();

        public QuestionsController(dbCon dbcon, IUser user, ILogger<QuestionsController> logger, IQuestions questions)
        {
            _dbcon = dbcon;
            _user = user;
            _logger = logger;
            _questions = questions;
        }

        [HttpPost("create/{subsectionid}")]
        public async Task<ResponseModel> CreateQuestionAnswer([FromBody] CreateQuestionAnswerModel model, int subsectionid)
        {
            return await _questions.CreateQuestionAnswer(model,subsectionid); 
        }

        [HttpGet("list/{subsectionid}")]
        public async Task<dynamic> Questions(int subsectionid)
        {
            return await _questions.Questions(subsectionid);
        }

    }
}
