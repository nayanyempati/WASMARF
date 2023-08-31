using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Projects;
using System.Collections;

namespace opencops_tm_bo.Controllers
{
    [Route("api/projects")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        public readonly Messages _messages = new Messages();
        private readonly Cryptography _cryptography = new Cryptography();
        private readonly dbCon _dbcon = new dbCon();
        private readonly IUser _user;
        private readonly ICategories _categories;
        private readonly IProjects _projects;
        private readonly ILogger<ProjectsController> _logger;
        private readonly JWTTokenService _jWTTokenService = new JWTTokenService();

        public ProjectsController(dbCon dbcon, IUser user, ILogger<ProjectsController> logger, ICategories categories, IProjects projects)
        {
            _dbcon = dbcon;
            _user = user;
            _logger = logger;
            _categories = categories;
            _projects = projects;
        }

        [HttpGet("list")]
        public async Task<dynamic> ListProjects()
        {
            return await _projects.ListProjects();
        }


        [HttpPost("create")]
        public async Task<ResponseModel> CreateProject([FromBody] AddProject model)
        {
            return await _projects.CreateProject(model);
        }

        [HttpGet("details/{projectid}")]
        public async Task<Project?> ProjectDetails(int projectid)
        {
            return await _projects.ProjectDetails(projectid);
        }


        [HttpPost("addcomponent/{projectid}")]
        public async Task<ResponseModel> AddComponent([FromBody] AddProjectComponent model, int projectid)
        {
            return await _projects.AddComponent(model, projectid);
        }

        [HttpGet("listcomponents/{projectid}")]
        public async Task<dynamic> ListComponents(int projectid)
        {
            return await _projects.ListComponents(projectid);
        }

        [HttpDelete("deletecomponent/{projectid}/{componentid}")]
        public async Task<ResponseModel> DeleteComponent(int projectid, int componentid)
        {
            return await _projects.DeleteComponent(projectid, componentid);
        }

        [HttpGet("listweakness/{projectid}")]
        public async Task<ArrayList> ProjectWeakness(int projectid)
        {
            return await _projects.ProjectWeakness(projectid);
        }
    }
}
