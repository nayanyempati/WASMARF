using Microsoft.EntityFrameworkCore;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Library;

namespace opencops_tm_bo.Services
{
    public class ComponentsServices : IComponents
    {
        private readonly dbCon _dbcon = new dbCon();
        private readonly Cryptography _cryptography = new Cryptography();
        public readonly Messages _messages = new Messages();
        public ComponentsServices(dbCon dbcon)
        {
            _dbcon = dbcon;
        }

        public async Task<Component?> ComponentDetails(int component_id)
        {
            return await _dbcon.Components.FirstOrDefaultAsync(x => x.ComponentId == component_id);
        }

        public async Task<IList<Component>> Components()
        {

            return await _dbcon.Components.ToListAsync();
        }

        public async Task<ResponseModel> UpdateComponentStatus(int countermeasure_id, bool status)
        {
            var details = await _dbcon.Components.FirstOrDefaultAsync(x => x.ComponentId == countermeasure_id);
            if (details != null)
            {
                details.ComponentStatus = status;
                await _dbcon.SaveChangesAsync();
                return new ResponseModel { Message = _messages.COMPONENT_UPDAATED_SUCCESSFULLY, Status = _messages.SUCCESS, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.COMPONENT_NOT_FOUND, Status = _messages.FAILED, StatusCode = 200 };
        }

        public async Task<ResponseModel> CreateComponent(CreateComponentModel model)
        {
            var details = await _dbcon.Components.FirstOrDefaultAsync(x => x.ComponentName == model.ComponentName);
            if (details == null)
            {
                await _dbcon.Components.AddAsync(new Component
                {
                    ComponentName = model.ComponentName,
                    ComponentDescription = model.ComponentDescription,
                    ComponentStatus = false,
                    ComponentToken = Guid.NewGuid().ToString(),
                    ComponentType = "Built-in",
                    CreatedOn = DateTime.Now,
                    ModifiedOn = DateTime.Now

                });
                await _dbcon.SaveChangesAsync();
                return new ResponseModel { Message = _messages.COMPONENT_CREATED + " '" + model.ComponentName + "' " + _messages.CREATED_SUCCESSFULLY, Status = _messages.SUCCESS, StatusCode = 200 };

            }
            return new ResponseModel { Message = _messages.COMPONENT_EXIST, Status = _messages.FAILED, StatusCode = 200 };

        }

        public async Task<dynamic> ListComponentWeakness(int component_id)
        {
            return await (from CW in _dbcon.ComponentWeaknessMappings
                          from W in _dbcon.Weaknesses
                          where W.WeaknessId==CW.WeaknessId && CW.ComponentId == component_id
                          select new
                          {
                             CW.Id,
                             W.WeaknessName

                          }).ToListAsync();
        }

        public async Task<ResponseModel> AddWeakness(int componentid, int weaknessid)
        {
            var check = await _dbcon.ComponentWeaknessMappings.FirstOrDefaultAsync(x => x.ComponentId == componentid && x.WeaknessId == weaknessid);
            if (check == null)
            {
                await _dbcon.ComponentWeaknessMappings.AddAsync(new ComponentWeaknessMapping
                {
                    ComponentId = componentid,
                    CreatedOn = DateTime.UtcNow,
                    Token = Guid.NewGuid().ToString(),
                    WeaknessId = weaknessid
                });
                await _dbcon.SaveChangesAsync();
                return new ResponseModel { Message = _messages.WEAKNESS_IMPORTED, Status = _messages.SUCCESS, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.WEAKNESS_EXIST, Status = _messages.FAILED, StatusCode = 200 };
        }

        public async Task<ResponseModel> DeleteWeakness(int componentid, int id)
        {
            var check = await _dbcon.ComponentWeaknessMappings.FirstOrDefaultAsync(x=>x.Id==id && x.ComponentId==componentid);
            if (check != null)
            {
                _dbcon.ComponentWeaknessMappings.Remove(check);
                await _dbcon.SaveChangesAsync();
                return new ResponseModel { Message = _messages.WEAKNESS_REMOVED, Status = _messages.SUCCESS, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.WEAKNESS_NOT_FOUND, Status = _messages.FAILED, StatusCode = 200 };
        }
    }
}
