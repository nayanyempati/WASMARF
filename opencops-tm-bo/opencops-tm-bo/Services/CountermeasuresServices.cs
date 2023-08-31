using Microsoft.EntityFrameworkCore;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Countermeasures;
using opencops_tm_bo.Models.Library;

namespace opencops_tm_bo.Services
{
    public class CountermeasuresServices : ICountermeasures
    {
        private readonly dbCon _dbcon = new dbCon();
        private readonly Cryptography _cryptography = new Cryptography();
        public readonly Messages _messages = new Messages();
        public CountermeasuresServices(dbCon dbcon)
        {
            _dbcon = dbcon;
        }
        public async Task<dynamic> Countermeasure()
        {
            return await (from C in _dbcon.Countermeasures
                          select new
                          {
                              C.CountermeasureId,
                              C.CountermeasureName,
                              Howto = (from H in _dbcon.HowTos
                                       where H.CountermeasureToken == C.CountermeasureToken
                                       select new
                                       {
                                           H.HowToId,
                                           H.HowToName
                                       }).ToList()
                          }).ToListAsync();
        }

        public async Task<dynamic?> Details(int countermeasureid)
        {
            return await (from C in _dbcon.Countermeasures
                          from W in _dbcon.Weaknesses
                          where C.WeaknessToken == W.WeaknessToken && C.CountermeasureId == countermeasureid
                          select new
                          {
                              C.CountermeasureId,
                              C.CountermeasureName,
                              C.CountermeasurePriority,
                              C.CountermeasureSolution,
                              C.Custom,
                              C.CountermeasureToken,
                              W.WeaknessName,
                              W.WeaknessToken,
                              W.WeaknessId,
                              C.Phase,
                              W.WeaknessDescription
                          }).FirstOrDefaultAsync();
        }

        public async Task<dynamic?> CountermeasuresById(int countermeasureid)
        {
            return await (from C in _dbcon.Countermeasures
                          where C.CountermeasureId == countermeasureid
                          select new
                          {
                              C.CountermeasureId,
                              C.CountermeasureName,
                              C.CountermeasureToken,
                              C.WeaknessToken
                          }).FirstOrDefaultAsync();
        }

        public async Task<dynamic> ListCountermeasuresByWeaknessId(int weaknessid)
        {
            return await _dbcon.Countermeasures.Where(x => x.WeaknessId == weaknessid).ToListAsync();
        }

        public async Task<ResponseModel> Addcountermeasure(AddCountermeasureModel model)
        {
            var checkExist = await _dbcon.Countermeasures.FirstOrDefaultAsync(x => x.CountermeasureName == model.CountermeasureName && x.CountermeasurePriority == model.CountermeasurePriority);
            if (checkExist == null)
            {
                var checkWeakness = await _dbcon.Weaknesses.FirstOrDefaultAsync(x => x.WeaknessId == model.WeaknessId);
                if (checkWeakness != null)
                {
                    await _dbcon.Countermeasures.AddAsync(new Countermeasure
                    {
                        CountermeasureName = model.CountermeasureName,
                        CountermeasurePriority = model.CountermeasurePriority,
                        CountermeasureSolution = model.CountermeasureSolution,
                        CreatedOn = DateTime.Now,
                        Custom = true,
                        Phase = model.Phase,
                        WeaknessId=checkWeakness.WeaknessId,
                        WeaknessToken=checkWeakness.WeaknessToken,
                        CountermeasureToken=Guid.NewGuid().ToString(),

                    });
                    await _dbcon.SaveChangesAsync();
                    return new ResponseModel { Message = _messages.COUNTERMEASURES_CREATED, Status = _messages.SUCCESS, StatusCode = 200 };
                }
                return new ResponseModel { Message = _messages.WEAKNESS_NOT_FOUND, Status = _messages.FAILED, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.COUNTERMEASURES_EXIST, Status = _messages.FAILED, StatusCode = 200 };
        }
    }
}
