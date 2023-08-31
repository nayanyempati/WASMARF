using Microsoft.EntityFrameworkCore;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Projects;
using System.Collections;
using System.Net.WebSockets;

namespace opencops_tm_bo.Services
{
    public class ProjectsServices : IProjects
    {
        private readonly dbCon _dbcon = new dbCon();
        private readonly Cryptography _cryptography = new Cryptography();
        public readonly Messages _messages = new Messages();
        public ProjectsServices(dbCon dbcon)
        {
            _dbcon = dbcon;
        }
        public async Task<dynamic> ListProjects()
        {
            return await (from P in _dbcon.Projects
                          select new
                          {
                              P.ProjectId,
                              P.ProjctDescription,
                              P.ProjectName,
                              P.RiskPolicyName,
                              P.SurveyCompleted,
                              P.RiskPolicyId,
                              ClassificationName= _dbcon.Classifications.Where(x=>x.RiskPolicyId==P.RiskPolicyId).Select(x=>x.ClassificationName).FirstOrDefault()
                          }).ToListAsync();
        }

        public async Task<ResponseModel> CreateProject(AddProject model)
        {
            var checkPolicy = await _dbcon.RiskPolicies.FirstOrDefaultAsync(x => x.RiskPolicyId == model.RiskPolicyId);
            var checkClassification = await _dbcon.Classifications.FirstOrDefaultAsync(x=>x.RiskPolicyId==model.RiskPolicyId);
            string ClassificationName = string.Empty;
            if(checkClassification != null)
            {
                ClassificationName = checkClassification.ClassificationName;
            }

            await _dbcon.Projects.AddAsync(new Project
            {
                CreatedOn = DateTime.Now,
                ProjctDescription = model.ProjctDescription,
                ProjectName = model.ProjectName,
                RiskPolicyName = checkPolicy.RiskPolicyName,
                SurveyCompleted = false,
                RiskPolicyId = checkPolicy.RiskPolicyId,
                Token = Guid.NewGuid().ToString(),
            });
            await _dbcon.SaveChangesAsync();
            return new ResponseModel { Message = _messages.PROJECT_CREATED, Status = _messages.SUCCESS, StatusCode = 200 };
        }

        public async Task<Project?> ProjectDetails(int projectid)
        {
            return await _dbcon.Projects.FirstOrDefaultAsync(x=>x.ProjectId==projectid);
        }

        public async Task<ResponseModel> AddComponent(AddProjectComponent model, int projectid)
        {
            var checkComponent = await _dbcon.ProjectComponentMappings.FirstOrDefaultAsync(x=>x.ComponentId==model.ComponentId && x.ProjectId==projectid);
            if(checkComponent == null)
            {
                var projectDetails = await _dbcon.Projects.FirstOrDefaultAsync(x=>x.ProjectId==projectid);
                if (projectDetails != null)
                {
                    var componentDetails = await _dbcon.Components.FirstOrDefaultAsync(x=>x.ComponentId==model.ComponentId);
                    if(componentDetails != null)
                    {
                        await _dbcon.ProjectComponentMappings.AddAsync(new ProjectComponentMapping
                        {
                            ComponenetToken = componentDetails.ComponentToken,
                            CreatedOn = DateTime.Now,
                            ComponentId = model.ComponentId,
                            ProjectId = projectid,
                            ProjectToken = projectDetails.Token,
                            Token = Guid.NewGuid().ToString(),
                        });
                        await _dbcon.SaveChangesAsync();
                        return new ResponseModel { Message = _messages.COMPONENT_IMPORTED_SUCCESSFULLY, Status = _messages.SUCCESS, StatusCode = 200 };
                    }
                    return new ResponseModel { Message = _messages.COMPONENT_NOT_FOUND, Status = _messages.FAILED, StatusCode = 200 };
                }
                return new ResponseModel { Message = _messages.PROJECT_NOT_FOUND, Status = _messages.FAILED, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.COMPONENT_EXIST, Status = _messages.FAILED, StatusCode = 200 };
        }

        public async Task<dynamic> ListComponents(int projectid)
        {
            return await (from CP in _dbcon.ProjectComponentMappings
                          from C in _dbcon.Components
                          where CP.ComponentId == C.ComponentId && CP.ProjectId == projectid
                          select new
                          {
                              C.ComponentName,
                              CP.ComponentId
                          }).ToListAsync();
        }

        public async Task<ResponseModel> DeleteComponent(int projectid, int componentid)
        {

            var details = await _dbcon.ProjectComponentMappings.Where(x => x.ProjectId == projectid && x.ComponentId == componentid).FirstOrDefaultAsync();
            if (details != null)
            {
                _dbcon.ProjectComponentMappings.Remove(details);
                await _dbcon.SaveChangesAsync();
                return new ResponseModel { Message = _messages.COMPONENT_REMOVED_SUCCESSFULLY, Status = _messages.SUCCESS, StatusCode = 200 };
            }
            return new ResponseModel {Message=_messages.COMPONENT_NOT_FOUND, Status=_messages.FAILED, StatusCode=200 };
        }

        public async Task<ArrayList> ProjectWeakness(int projectid)
        {
            var checkProjectDetails = await _dbcon.Projects.FirstOrDefaultAsync(x=>x.ProjectId==projectid);
            ArrayList arrayList = new ArrayList();
            if(checkProjectDetails != null)
            {
                var checkComponents = await _dbcon.ProjectComponentMappings.Where(x=>x.ProjectId==projectid).ToListAsync();
                foreach ( var component in checkComponents)
                {
                    var checkComponentWeakess = await _dbcon.ComponentWeaknessMappings.Where(x=>x.ComponentId==component.ComponentId).ToListAsync();
                    foreach(var weakness in checkComponentWeakess)
                    {
                        var weaknessDetails = await _dbcon.Weaknesses.FirstOrDefaultAsync(x=>x.WeaknessId==weakness.WeaknessId);
                        arrayList.Add(weaknessDetails);
                    }
                }
            }
            return arrayList;
        }

      
    }
}
