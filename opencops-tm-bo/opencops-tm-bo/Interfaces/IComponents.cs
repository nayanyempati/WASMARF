using opencops_tm_bo.Entities;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Library;

namespace opencops_tm_bo.Interfaces
{
    public interface IComponents
    {
        Task<Component?> ComponentDetails(int component_id);
        Task<IList<Component>> Components();
        Task<ResponseModel> CreateComponent(CreateComponentModel model);
        Task<dynamic> ListComponentWeakness(int component_id);
        Task<ResponseModel> UpdateComponentStatus(int countermeasure_id, bool status);

        Task<ResponseModel> AddWeakness(int componentid, int weaknessid);
        Task<ResponseModel> DeleteWeakness(int componentid, int id);
    }
}
