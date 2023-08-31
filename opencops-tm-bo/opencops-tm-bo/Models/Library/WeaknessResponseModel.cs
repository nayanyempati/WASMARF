using opencops_tm_bo.Entities;

namespace opencops_tm_bo.Models.Library
{
    public class WeaknessResponseModel
    {
        public int WeaknessId { get; set; }
        public string WeaknessName { get; set; } = null!;
        public string? WeaknessCwes { get; set; }
        public int WeaknessRiskRating { get; set; }
        public IList<Countermeasure>? Countermeasures { get; set; }
    }
}
