namespace opencops_tm_bo.Models.Classifications
{
    public class CreateClassificationModel
    {
        public string ClassificationName { get; set; } = null!;
        public string? ClassificationDescription { get; set; }
        public string? RiskPolicyName { get; set; } = null!;
    }
}
