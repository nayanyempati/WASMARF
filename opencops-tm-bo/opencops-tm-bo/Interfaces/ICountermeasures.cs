using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Countermeasures;
using opencops_tm_bo.Models.Library;

namespace opencops_tm_bo.Interfaces
{
    public interface ICountermeasures
    {
        Task<ResponseModel> Addcountermeasure(AddCountermeasureModel model);
        Task<dynamic> Countermeasure();
        Task<dynamic?> CountermeasuresById(int countermeasureid);
        Task<dynamic?> Details(int countermeasureid);
        Task<dynamic> ListCountermeasuresByWeaknessId(int weaknessid);
    }
}
