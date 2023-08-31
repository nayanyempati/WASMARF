namespace opencops_tm_bo.Models.Riskpolicy
{
    public class CreateRiskPolicyModel
    {
        public string RiskPolicyName { get; set; } = null!;
        public string RiskPolicyDescription { get; set; } = null!;

        public string[]? RiskPolicyInclusion { get; set; }
        public int? RiskPolicyCountermeasurePriority { get; set; }
    }
}
