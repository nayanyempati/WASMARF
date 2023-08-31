using Microsoft.EntityFrameworkCore;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;

namespace opencops_tm_bo.Services
{
    public class AnswersServices : IAnswers
    {

        private readonly dbCon _dbcon = new dbCon();
        private readonly Cryptography _cryptography = new Cryptography();
        public readonly Messages _messages = new Messages();
        public AnswersServices(dbCon dbcon)
        {
            _dbcon = dbcon;
        }
        public async Task<dynamic?> Answers(int subsectionid, int questionid)
        {
            return await (from S in _dbcon.SurveyQuestions
                          where S.SurveyQuestionId == questionid
                          select new
                          {
                              S.SectionName,
                              S.SubsectionName,
                              SurveyQuestion= S.SurveyQuestion1,
                              S.SurveyQuestionFormat,
                              S.SurveyQuestionDescription,
                              S.CreatedOn,
                              Answers = (from A in _dbcon.SurveyAnswers
                                         where A.SurveyQuestionId == questionid
                                         select new
                                         {
                                             A.SurveyAnswersId,
                                             A.SurveyQuestionAnswer
                                         }).ToList()
                          }).FirstOrDefaultAsync();
        }
    }
}
