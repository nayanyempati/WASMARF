using Microsoft.EntityFrameworkCore;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Dashboard;

namespace opencops_tm_bo.Services
{
    public class DashboardService : IDashboard
    {
        private readonly dbCon _dbcon = new dbCon();
        private readonly Cryptography _cryptography = new Cryptography();
        public readonly Messages _messages = new Messages();
        public DashboardService(dbCon dbcon)
        {
            _dbcon = dbcon;
        }
        public async Task<OverviewResponseModel> Overview()
        {
            var OverviewResponseModel = new OverviewResponseModel
            {
                Categories = await _dbcon.Categories.CountAsync(),
                Classifications = await _dbcon.Classifications.CountAsync(),
                Countermeasures = await _dbcon.Countermeasures.CountAsync(),
                Profiles = await _dbcon.Profiles.CountAsync(),
                Projects = await _dbcon.Projects.CountAsync(),
                RiskPolicies = await _dbcon.RiskPolicies.CountAsync(),
                Weakness = await _dbcon.Weaknesses.CountAsync(),
                Phases= await _dbcon.Phases.CountAsync(),
            };
            return OverviewResponseModel;
        }
    }
}
