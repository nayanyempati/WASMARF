using opencops_tm_bo.Entities;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Library;

namespace opencops_tm_bo.Interfaces
{
    public interface ISections
    {
        Task<dynamic> Sections();
        Task<ResponseModel> CreateSection(CreateSectionModel model);
        Task<SurveySection?> ViewSection(int section_id);

    }
}
