using Microsoft.EntityFrameworkCore;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Questions;

namespace opencops_tm_bo.Services
{
    public class QuestionsServices : IQuestions
    {
        private readonly dbCon _dbcon = new dbCon();
        private readonly Cryptography _cryptography = new Cryptography();
        public readonly Messages _messages = new Messages();
        public QuestionsServices(dbCon dbcon)
        {
            _dbcon = dbcon;
        }
        public async Task<ResponseModel> CreateQuestionAnswer(CreateQuestionAnswerModel model, int subsectionid)
        {
            var checkSubSection = await _dbcon.SurveySubsections.FirstOrDefaultAsync(x => x.SubsectionId == subsectionid);
            if (checkSubSection != null)
            {
                string surveyQuestionToken = Guid.NewGuid().ToString();
                var questions = new SurveyQuestion
                {
                    CreatedOn = DateTime.Now,
                    SectionId = checkSubSection.SectionId,
                    SubsectionId = subsectionid,
                    SectionName = checkSubSection.SectionName,
                    SubsectionName = checkSubSection.SubsectionName,
                    SurveyQuestion1 = model.SurveyQuestion,
                    SurveyQuestionDescription = model.SurveyQuestionDescription,
                    SurveyQuestionFormat = model.SurveyQuestionFormat,
                    SurveyQuestionToken = surveyQuestionToken,
                };
                await _dbcon.SurveyQuestions.AddAsync(questions);
                await _dbcon.SaveChangesAsync();

                foreach (var answers in model.SurveyAnswers)
                {
                    await _dbcon.SurveyAnswers.AddAsync(new SurveyAnswer
                    {
                        CreatedOn= DateTime.Now,
                        SectionId = checkSubSection.SectionId,
                        SubsectionId = subsectionid,
                        SectionName = checkSubSection.SectionName,
                        SubsectionName = checkSubSection.SubsectionName,
                        SurveyAnswerToken=Guid.NewGuid().ToString(),
                        SurveyQuestion=model.SurveyQuestion,
                        SurveyQuestionAnswer=answers,
                        SurveyQuestionId= questions.SurveyQuestionId,
                        SurveyQuestionToken=surveyQuestionToken
                    });
                    await _dbcon.SaveChangesAsync();

                }
                return new ResponseModel { Message = questions.SurveyQuestionId.ToString(), Status = _messages.SUCCESS, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.SELECT_VALID_SUBSECTION, Status = _messages.FAILED, StatusCode = 200 };
        }

        public async Task<dynamic> Questions(int subsectionid)
        {

            return await (from Q in _dbcon.SurveyQuestions
                          where Q.SubsectionId == subsectionid
                          select new
                          {
                              Q.SurveyQuestionId,
                              Q.SurveyQuestion1,
                          }).ToListAsync();
        }
    }
}
