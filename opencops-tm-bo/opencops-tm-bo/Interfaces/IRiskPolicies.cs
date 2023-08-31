using opencops_tm_bo.Entities;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Phases;
using opencops_tm_bo.Models.Riskpolicy;

namespace opencops_tm_bo.Interfaces
{
    public interface IRiskPolicies
    {
        Task<RiskPolicy?> Details(int riskpolicyid);
        Task<IList<RiskPolicy>> List();

        Task<ResponseModel> Create(CreateRiskPolicyModel model);
    }
}
