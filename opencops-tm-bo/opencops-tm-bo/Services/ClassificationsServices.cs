using Microsoft.EntityFrameworkCore;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Classifications;
using opencops_tm_bo.Models.Common;

namespace opencops_tm_bo.Services
{
    public class ClassificationsServices : IClassifications
    {
        private readonly dbCon _dbcon = new dbCon();
        private readonly Cryptography _cryptography = new Cryptography();
        public readonly Messages _messages = new Messages();
        public ClassificationsServices(dbCon dbcon)
        {
            _dbcon = dbcon;
        }

        public async Task<Classification?> ClassificationDetails(int classificationid)
        {
            return await _dbcon.Classifications.FirstOrDefaultAsync(x => x.ClassificationId == classificationid);
        }

        public async Task<ResponseModel> CreateClassification(CreateClassificationModel model)
        {
            var check = await _dbcon.Classifications.FirstOrDefaultAsync(x => x.ClassificationName == model.ClassificationName);
            if (check == null)
            {
                int riskPolicyId=await _dbcon.RiskPolicies.Where(x=>x.RiskPolicyName==model.RiskPolicyName).Select(x=>x.RiskPolicyId).FirstOrDefaultAsync();
                await _dbcon.Classifications.AddAsync(new Classification
                {
                    ClassificationDescription= model.ClassificationDescription,
                    ClassificationName= model.ClassificationName,
                    CreatedOn=DateTime.Now,
                    RiskPolicyName=model.RiskPolicyName,
                    Token=Guid.NewGuid().ToString(),
                    RiskPolicyId= riskPolicyId
                });
                await _dbcon.SaveChangesAsync();
                return new ResponseModel { Message = _messages.CLASSIFICATION_CREATED, Status = _messages.SUCCESS, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.CLASSIFICATION_EXIST, Status = _messages.FAILED, StatusCode = 200 };
        }

        public async Task<IList<Classification>> List()
        {

            return await _dbcon.Classifications.ToListAsync();
        }
    }
}
