using opencops_tm_bo.Models.Dashboard;

namespace opencops_tm_bo.Interfaces
{
    public interface IDashboard
    {
        Task<OverviewResponseModel> Overview();
    }
}
