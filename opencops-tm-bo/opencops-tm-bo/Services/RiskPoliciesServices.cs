using Microsoft.EntityFrameworkCore;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Phases;
using opencops_tm_bo.Models.Riskpolicy;

namespace opencops_tm_bo.Services
{
    public class RiskPoliciesServices : IRiskPolicies
    {

        private readonly dbCon _dbcon = new dbCon();
        private readonly Cryptography _cryptography = new Cryptography();
        public readonly Messages _messages = new Messages();
        public RiskPoliciesServices(dbCon dbcon)
        {
            _dbcon = dbcon;
        }
        public async Task<ResponseModel> Create(CreateRiskPolicyModel model)
        {
            var check = await _dbcon.RiskPolicies.FirstOrDefaultAsync(x => x.RiskPolicyName == model.RiskPolicyName);
            if (check == null)
            {
                await _dbcon.RiskPolicies.AddAsync(new RiskPolicy
                {
                    CreatedOn = DateTime.UtcNow,
                    Custom = false,
                    RiskPolicyCountermeasurePriority = model.RiskPolicyCountermeasurePriority,
                    RiskPolicyDescription = model.RiskPolicyDescription,
                    RiskPolicyInclusion = model.RiskPolicyInclusion.ToString(),
                    RiskPolicyName = model.RiskPolicyName,
                    Token = Guid.NewGuid().ToString()
                });
                try
                {
                    await _dbcon.SaveChangesAsync();
                }
                catch(Exception ex) { 
                }
                
                return new ResponseModel { Message = _messages.RISKPOLICY_CREATED, Status = _messages.SUCCESS, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.RISKPOLICY_EXIST, Status = _messages.FAILED, StatusCode = 200 };
        }

        public async Task<RiskPolicy?> Details(int riskPolicyId)
        {
            return await _dbcon.RiskPolicies.FirstOrDefaultAsync(x => x.RiskPolicyId == riskPolicyId);
        }

        public async Task<IList<RiskPolicy>> List()
        {
            return await _dbcon.RiskPolicies.ToListAsync();
        }
    }
}
