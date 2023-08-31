using Microsoft.EntityFrameworkCore;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Library.Profile;

namespace opencops_tm_bo.Services
{
    public class ProfilesServices : IProfiles
    {
        private readonly dbCon _dbcon = new dbCon();
        private readonly Cryptography _cryptography = new Cryptography();
        public readonly Messages _messages = new Messages();
        public ProfilesServices(dbCon dbcon)
        {
            _dbcon = dbcon;
        }

        public async Task<IList<Profile>> Profiles()
        {
            return await _dbcon.Profiles.ToListAsync();
        }


        public async Task<ResponseModel> CreateProfile(CreateProfileModel model)
        {
            var details = await _dbcon.Profiles.FirstOrDefaultAsync(x => x.ProfileName == model.ProfileName);
            if (details == null)
            {
                await _dbcon.Profiles.AddAsync(new Profile
                {
                    ProfileCreatedBy = 1,
                    ProfileCreatedOn = DateTime.Now,
                    ProfileDescription = model.ProfileDescription,
                    ProfileIsActive = false,
                    ProfileName = model.ProfileName,
                    ProfileReadonly = false,
                    ProfileToken = Guid.NewGuid().ToString(),
                    ProfileUpdatedOn = DateTime.Now,
                });
                await _dbcon.SaveChangesAsync();
                return new ResponseModel { Message = _messages.PROFILE_CREATED, Status = _messages.SUCCESS, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.PROFILE_EXIST, Status = _messages.FAILED, StatusCode = 200 };
        }

        public async Task<ResponseModel> UpdateProfileStatus(int profileid, bool status)
        {
            var details = await _dbcon.Profiles.FirstOrDefaultAsync(x => x.ProfileId == profileid);
            if (details != null)
            {
                details.ProfileIsActive = status;
                await _dbcon.SaveChangesAsync();
                return new ResponseModel { Message = _messages.PROFILE_UPDATED, Status = _messages.SUCCESS, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.PROFILE_NOT_FOUND, Status = _messages.FAILED, StatusCode = 200 };
        }

        public async Task<ResponseModel> ProfileWeaknessMapping(int profileid, int weaknessid)
        {
            var details = await _dbcon.ProfileWeaknessMappings.FirstOrDefaultAsync(x => x.ProfileId == profileid && x.WeaknessId == weaknessid);
            if (details == null)
            {
                await _dbcon.ProfileWeaknessMappings.AddAsync(new ProfileWeaknessMapping
                {
                    CreatedOn = DateTime.UtcNow,
                    ProfileId = profileid,
                    WeaknessId = weaknessid,
                    Token = Guid.NewGuid().ToString()
                });
                await _dbcon.SaveChangesAsync();
                return new ResponseModel { Message = _messages.WEAKNESS_IMPORTED, Status = _messages.SUCCESS, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.WEAKNESS_EXIST, Status = _messages.FAILED, StatusCode = 200 };
        }

        public async Task<dynamic> ListWeakness(int profileid)
        {
            return await (from PW in _dbcon.ProfileWeaknessMappings
                          from W in _dbcon.Weaknesses
                          where PW.WeaknessId == W.WeaknessId && PW.ProfileId == profileid
                          select new
                          {
                              W.WeaknessName,
                              PW.Id
                          }).ToListAsync();
        }

        public async Task<Profile?> Details(int profileid)
        {
            return await _dbcon.Profiles.FirstOrDefaultAsync(x => x.ProfileId == profileid);
        }

        public async Task<ResponseModel> DeleteWeakness(int id)
        {
            var checkExist = await _dbcon.ProfileWeaknessMappings.FirstOrDefaultAsync(x => x.Id == id);
            if (checkExist != null)
            {
                _dbcon.ProfileWeaknessMappings.Remove(checkExist);
                await _dbcon.SaveChangesAsync();
                return new ResponseModel { Message = _messages.WEAKNESS_REMOVED, Status = _messages.SUCCESS, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.WEAKNESS_NOT_FOUND, Status = _messages.FAILED, StatusCode = 200 };
        }
    }
}
