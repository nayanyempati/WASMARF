namespace opencops_tm_bo.Models.Countermeasures
{
    public class AddCountermeasureModel
    {
        public int WeaknessId { get; set; }
        public string CountermeasureName { get; set; } = null!;
        public string CountermeasureSolution { get; set; } = null!;
        public int CountermeasurePriority { get; set; }
        public string? Phase { get; set; }
    }
}
