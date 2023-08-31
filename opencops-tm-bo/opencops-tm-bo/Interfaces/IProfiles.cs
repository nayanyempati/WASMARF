using opencops_tm_bo.Entities;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Library.Profile;

namespace opencops_tm_bo.Interfaces
{
    public interface IProfiles
    {
        Task<IList<Profile>> Profiles();
        Task<ResponseModel> CreateProfile(CreateProfileModel model);
        Task<ResponseModel> UpdateProfileStatus(int profileid, bool status);
        Task<ResponseModel> ProfileWeaknessMapping(int profileid, int weaknessid);

        Task<dynamic> ListWeakness(int profileid);
        Task<Profile?> Details(int profileid);
        Task<ResponseModel> DeleteWeakness(int id);
    }
}
