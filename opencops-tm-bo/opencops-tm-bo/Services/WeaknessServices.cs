using Microsoft.EntityFrameworkCore;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Weakness;
using System.ComponentModel;

namespace opencops_tm_bo.Services
{
    public class WeaknessServices : IWeakness
    {
        private readonly dbCon _dbcon = new dbCon();
        private readonly Cryptography _cryptography = new Cryptography();
        public readonly Messages _messages = new Messages();
        public WeaknessServices(dbCon dbcon)
        {
            _dbcon = dbcon;
        }

        public async Task<dynamic> Weakness()
        {
            return await (from W in _dbcon.Weaknesses
                          select new
                          {
                              W.WeaknessId,
                              W.WeaknessName,
                              W.WeaknessToken,
                              W.WeaknessCwes,
                              W.WeaknessRiskRating,
                              Countermeasures = (from C in _dbcon.Countermeasures
                                                 where C.WeaknessToken == W.WeaknessToken
                                                 select new
                                                 {
                                                     C.CountermeasureId,
                                                     C.CountermeasureName,
                                                 }).ToList()
                          }).ToListAsync();
        }

        public async Task<dynamic?> WeaknessByCounterMeasureId(int countermeasureid)
        {
            return await (from C in _dbcon.Countermeasures
                          from W in _dbcon.Weaknesses
                          where W.WeaknessToken == C.WeaknessToken && C.CountermeasureId == countermeasureid
                          select new
                          {
                              W.WeaknessName,
                              W.WeaknessId,
                              W.WeaknessDescription,
                              W.WeaknessToken
                          }).FirstOrDefaultAsync();
        }

        public async Task<dynamic?> ListForCountermeasures()
        {
           
            return await (from C in _dbcon.Countermeasures
                          from W in _dbcon.Weaknesses
                          where W.WeaknessToken == C.WeaknessToken
                          select new
                          {
                              W.WeaknessName,
                              W.WeaknessId,
                              W.WeaknessDescription,
                              W.WeaknessToken
                          }).Distinct().ToListAsync();
        }

        public async Task<Weakness?> Details(int weaknessid)
        {
           return await _dbcon.Weaknesses.FirstOrDefaultAsync(x=>x.WeaknessId==weaknessid) ;
        }

        public async Task<ResponseModel> AddWeakness(CreateWeaknessModel model)
        {
            var check = await _dbcon.Weaknesses.FirstOrDefaultAsync(x => x.WeaknessName == model.WeaknessName);
            if (check == null)
            {
                await _dbcon.Weaknesses.AddAsync(new Entities.Weakness
                {
                    Custom=true,
                    CreatedOn=DateTime.Now,
                    WeaknessCategory=model.WeaknessCategory,
                    WeaknessCwes=model.WeaknessCwes,
                    WeaknessDescription= model.WeaknessDescription,
                    WeaknessName= model.WeaknessName,
                    WeaknessRiskRating= model.WeaknessRiskRating,
                    WeaknessToken=Guid.NewGuid().ToString()

                });

                await _dbcon.SaveChangesAsync();
                return new ResponseModel { Message = _messages.WEAKNESS_CREATED, Status = _messages.SUCCESS, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.WEAKNESS_EXIST, Status = _messages.FAILED, StatusCode = 200 };
        }
    }
}
