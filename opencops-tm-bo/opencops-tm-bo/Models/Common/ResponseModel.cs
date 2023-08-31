namespace opencops_tm_bo.Models.Common
{
    public class ResponseModel
    {
        public string Message { get; set; } = null!;
        public string Status { get; set; } = null!;
        public int StatusCode { get; set; }
    }
}
