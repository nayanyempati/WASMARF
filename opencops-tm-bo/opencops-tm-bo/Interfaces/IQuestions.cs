using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Questions;

namespace opencops_tm_bo.Interfaces
{
    public interface IQuestions
    {
        Task<ResponseModel> CreateQuestionAnswer(CreateQuestionAnswerModel model, int subsectionid);
        Task<dynamic> Questions(int subsectionid);
    }
}
