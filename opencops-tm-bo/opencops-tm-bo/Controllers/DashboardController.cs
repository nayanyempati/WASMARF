using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Dashboard;

namespace opencops_tm_bo.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        public readonly Messages _messages = new Messages();
        private readonly Cryptography _cryptography = new Cryptography();
        private readonly dbCon _dbcon = new dbCon();
        private readonly IUser _user;
        private readonly IDashboard _dashboard;
        private readonly IProfiles _profiles;
        private readonly ILogger<DashboardController> _logger;
        private readonly JWTTokenService _jWTTokenService = new JWTTokenService();

        public DashboardController(dbCon dbcon, IUser user, ILogger<DashboardController> logger, IProfiles profiles, IDashboard dashboard)
        {
            _dbcon = dbcon;
            _user = user;
            _logger = logger;
            _profiles = profiles;
            _dashboard = dashboard;
        }

        [HttpGet("overview")]
        public async Task<OverviewResponseModel> Overview()
        {
            return await _dashboard.Overview();
        }


    }
}
