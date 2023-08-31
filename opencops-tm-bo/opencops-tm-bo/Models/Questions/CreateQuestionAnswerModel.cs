namespace opencops_tm_bo.Models.Questions
{
    public class CreateQuestionAnswerModel
    {
        public string SurveyQuestion { get; set; } = null!;
        public string SurveyQuestionDescription { get; set; } = null!;

        public string SurveyQuestionFormat { get; set; } = null!;
        public string? Answers { get; set; }

        public string[] SurveyAnswers { get; set; } = null!;

    }
}
