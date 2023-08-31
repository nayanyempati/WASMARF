using Microsoft.EntityFrameworkCore;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Phases;

namespace opencops_tm_bo.Services
{
    public class PhasesServices : IPhases
    {
        private readonly dbCon _dbcon = new dbCon();
        private readonly Cryptography _cryptography = new Cryptography();
        public readonly Messages _messages = new Messages();
        public PhasesServices(dbCon dbcon)
        {
            _dbcon = dbcon;
        }
        public async Task<IList<Phase>> List()
        {

            return await _dbcon.Phases.ToListAsync();
        }

        public async Task<ResponseModel> CreatePhase(CreatePhaseModel model)
        {
            var check = await _dbcon.Phases.FirstOrDefaultAsync(x=>x.PhaseName==model.PhaseName);
            if(check == null)
            {
                await _dbcon.Phases.AddAsync(new Phase
                {
                    PhaseName = model.PhaseName,
                    CreatedOn = DateTime.Now,
                    Custom=false,
                    PhaseDescription=model.PhaseDescription,
                    Token=Guid.NewGuid().ToString(),

                });
                await _dbcon.SaveChangesAsync();
                return new ResponseModel { Message = _messages.PHASE_CREATED, Status = _messages.SUCCESS, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.PHASE_EXIST, Status = _messages.FAILED, StatusCode = 200 };
        }

        public async Task<Phase?> PhaseDetails(int phaseid)
        {

            return await _dbcon.Phases.FirstOrDefaultAsync(x=>x.PhaseId== phaseid);
        }
    }
}
