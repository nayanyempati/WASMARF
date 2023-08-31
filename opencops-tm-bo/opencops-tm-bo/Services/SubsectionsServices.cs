using Microsoft.EntityFrameworkCore;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Subsections;

namespace opencops_tm_bo.Services
{
    public class SubsectionsServices : ISubsections
    {
        private readonly dbCon _dbcon = new dbCon();
        private readonly Cryptography _cryptography = new Cryptography();
        public readonly Messages _messages = new Messages();
        public SubsectionsServices(dbCon dbcon)
        {
            _dbcon = dbcon;
        }
        public async Task<IList<SurveySubsection>> Subsections(int sectionid)
        {
            return await _dbcon.SurveySubsections.Where(x => x.SectionId == sectionid).ToListAsync();
        }

        public async Task<ResponseModel> CreateSubsection(CreateSubsectionModel model, int sectionid)
        {
            var checkSection = await _dbcon.SurveySections.FirstOrDefaultAsync(x => x.SectionId == sectionid);
            if (checkSection != null)
            {
                await _dbcon.SurveySubsections.AddAsync(new SurveySubsection
                {
                    CreatedOn = DateTime.Now,
                    Custom = false,
                    SectionId = sectionid,
                    SectionName = checkSection.SectionName,
                    SubsectionName = model.SubsectionName,
                    SubsectionToken = Guid.NewGuid().ToString()
                });
                await _dbcon.SaveChangesAsync();
                return new ResponseModel { Message = _messages.CREATED_SUCCESSFULLY, Status = _messages.SUCCESS, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.SELECT_VALID_SECTION, Status = _messages.FAILED, StatusCode = 200 };
        }

        public async Task<SurveySubsection?> View(int sectionid, int subsectionid)
        {
            return await _dbcon.SurveySubsections.FirstOrDefaultAsync(x => x.SubsectionId == subsectionid && x.SectionId == sectionid);
        }
    }
}
