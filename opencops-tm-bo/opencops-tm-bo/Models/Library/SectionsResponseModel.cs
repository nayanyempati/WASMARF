using opencops_tm_bo.Entities;

namespace opencops_tm_bo.Models.Library
{
    public class SectionsResponseModel
    {
        public int SectionId { get; set; }

        public string SectionName { get; set; } = null!;
        public IList<SurveySubsection>? Subsection { get; set; }

    }
}
