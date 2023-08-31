using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;

namespace opencops_tm_bo.Controllers
{
    [Route("api/answers")]
    [ApiController]
    public class AnswersController : ControllerBase
    {
        public readonly Messages _messages = new Messages();
        private readonly Cryptography _cryptography = new Cryptography();
        private readonly dbCon _dbcon = new dbCon();
        private readonly IUser _user;
        private readonly IAnswers _answers;
        private readonly ILogger<AnswersController> _logger;
        private readonly JWTTokenService _jWTTokenService = new JWTTokenService();

        public AnswersController(dbCon dbcon, IUser user, ILogger<AnswersController> logger, IAnswers answers)
        {
            _dbcon = dbcon;
            _user = user;
            _logger = logger;
            _answers = answers;
        }

        [HttpGet("list/{subsectionid}/{questionid}")]
        public async Task<dynamic?> Answers(int subsectionid, int questionid)
        {
            return await _answers.Answers(subsectionid, questionid);
        }
    }
}
