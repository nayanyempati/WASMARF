using Microsoft.EntityFrameworkCore;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Library;

namespace opencops_tm_bo.Services
{
    public class SectionsServices : ISections
    {
        private readonly dbCon _dbcon = new dbCon();
        private readonly Cryptography _cryptography = new Cryptography();
        public readonly Messages _messages = new Messages();
        public SectionsServices(dbCon dbcon)
        {
            _dbcon = dbcon;
        }

        public async Task<dynamic> Sections()
        {
            return await(from S in _dbcon.SurveySections
                         select new
                         {
                             S.SectionId,
                             S.SectionName,
                             Subsections = (from H in _dbcon.SurveySubsections
                                            where H.SectionId == S.SectionId
                                            select new
                                            {
                                                H.SubsectionId,
                                                H.SubsectionName
                                            }).ToList()
                         }).ToListAsync();
        }

        public async Task<ResponseModel> CreateSection(CreateSectionModel model)
        {
            var details = await _dbcon.SurveySections.FirstOrDefaultAsync(x => x.SectionName == model.SectionName);
            if (details == null)
            {
                var section = new SurveySection
                {
                    CreatedOn = DateTime.Now,
                    Custom = true,
                    SectionName = model.SectionName,
                    SectionToken = Guid.NewGuid().ToString(),
                };
                _dbcon.SurveySections.Add(section);
                await _dbcon.SaveChangesAsync();
                return new ResponseModel { Message = section.SectionId.ToString(), Status = _messages.SUCCESS, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.SECTION_ALREADY_EXIST, Status = _messages.FAILED, StatusCode = 200 };
        }

        public async Task<SurveySection?> ViewSection(int section_id)
        {
            return await _dbcon.SurveySections.FirstOrDefaultAsync(x => x.SectionId == section_id);
        }
    }
}
