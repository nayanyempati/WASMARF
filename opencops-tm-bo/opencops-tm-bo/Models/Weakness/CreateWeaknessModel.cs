namespace opencops_tm_bo.Models.Weakness
{
    public class CreateWeaknessModel
    {
        public string WeaknessName { get; set; } = null!;
        public string WeaknessDescription { get; set; } = null!;
        public int WeaknessRiskRating { get; set; } 
        public string WeaknessCategory { get; set; } = null!;
        public string? WeaknessCwes { get; set; }


    }
}
