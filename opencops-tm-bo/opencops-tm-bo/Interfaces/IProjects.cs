using opencops_tm_bo.Entities;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Projects;
using System.Collections;

namespace opencops_tm_bo.Interfaces
{
    public interface IProjects
    {
        Task<ResponseModel> AddComponent(AddProjectComponent model, int projectid);
      
        Task<ResponseModel> CreateProject(AddProject model);
        Task<ResponseModel> DeleteComponent(int projectid, int componentid);
        Task<dynamic> ListComponents(int projectid);
        Task<dynamic> ListProjects();
        Task<Project?> ProjectDetails(int projectid);

        Task<ArrayList> ProjectWeakness(int projectid);
    }
}
