namespace opencops_tm_bo.Interfaces
{
    public interface IAnswers
    {
        Task<dynamic?> Answers(int subsectionid, int questionid);
    }
}
