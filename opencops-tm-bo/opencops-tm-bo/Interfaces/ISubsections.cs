using opencops_tm_bo.Entities;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Subsections;

namespace opencops_tm_bo.Interfaces
{
    public interface ISubsections
    {
        Task<ResponseModel> CreateSubsection(CreateSubsectionModel model, int sectionid);
        Task<IList<SurveySubsection>> Subsections(int sectionid);
        Task<SurveySubsection?> View(int sectionid, int subsectionid);
    }
}
