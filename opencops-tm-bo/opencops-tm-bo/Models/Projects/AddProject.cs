namespace opencops_tm_bo.Models.Projects
{
    public class AddProject
    {
        public string ProjectName { get; set; } = null!;
        public string? ProjctDescription { get; set; }
        public int RiskPolicyId { get; set; }
    }
}
