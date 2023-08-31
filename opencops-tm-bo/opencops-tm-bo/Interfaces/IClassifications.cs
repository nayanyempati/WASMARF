using opencops_tm_bo.Entities;
using opencops_tm_bo.Models.Classifications;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Phases;

namespace opencops_tm_bo.Interfaces
{
    public interface IClassifications
    {
        Task<Classification?> ClassificationDetails(int classificationid);
        Task<ResponseModel> CreateClassification(CreateClassificationModel model);
        Task<IList<Classification>> List();
    }
}
