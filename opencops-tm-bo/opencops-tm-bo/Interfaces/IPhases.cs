using opencops_tm_bo.Entities;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Phases;

namespace opencops_tm_bo.Interfaces
{
    public interface IPhases
    {
        Task<ResponseModel> CreatePhase(CreatePhaseModel model);
        Task<IList<Phase>> List();
        Task<Phase?> PhaseDetails(int phaseid);
    }
}
