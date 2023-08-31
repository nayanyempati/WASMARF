using opencops_tm_bo.Entities;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Weakness;

namespace opencops_tm_bo.Interfaces
{
    public interface IWeakness
    {
        Task<dynamic> Weakness();
        Task<dynamic?> ListForCountermeasures();
        Task<Weakness?> Details(int weaknessid);
        Task<ResponseModel> AddWeakness(CreateWeaknessModel model);
    }
}
