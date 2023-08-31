using Microsoft.AspNetCore.Mvc;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Library.Profile;

namespace opencops_tm_bo.Controllers
{
    [Route("api/profiles")]
    [ApiController]
    public class ProfilesController : ControllerBase
    {
        public readonly Messages _messages = new Messages();
        private readonly Cryptography _cryptography = new Cryptography();
        private readonly dbCon _dbcon = new dbCon();
        private readonly IUser _user;
        private readonly IProfiles _profiles;
        private readonly ILogger<ProfilesController> _logger;
        private readonly JWTTokenService _jWTTokenService = new JWTTokenService();

        public ProfilesController(dbCon dbcon, IUser user, ILogger<ProfilesController> logger, IProfiles profiles)
        {
            _dbcon = dbcon;
            _user = user;
            _logger = logger;
            _profiles = profiles;
        }

        [HttpGet("list")]
        public async Task<IList<Profile>> Profiles()
        {
            return await _profiles.Profiles();
        }

        [HttpGet("details/{profileid}")]
        public async Task<Profile?> Details(int profileid)
        {
            return await _profiles.Details(profileid);
        }

        [HttpPost("create")]
        public async Task<ResponseModel> CreateProfile([FromBody] CreateProfileModel model)
        {
            return await _profiles.CreateProfile(model);

        }

        [HttpPut("updatestatus/{profileid}/{status}")]
        public async Task<ResponseModel> UpdateProfileStatus(int profileid, bool status)
        {
            return await _profiles.UpdateProfileStatus(profileid, status);
        }


        [HttpPost("profileweaknessmapping/{profileid}/{weaknessid}")]
        public async Task<ResponseModel> ProfileWeaknessMapping(int profileid, int weaknessid)
        {
            return await _profiles.ProfileWeaknessMapping(profileid, weaknessid);
        }

        [HttpGet("listweakness/{profileid}")]
        public async Task<dynamic> ListWeakness(int profileid)
        {
            return await _profiles.ListWeakness(profileid);
        }

        [HttpGet("deleteweakness/{id}")]
        public async Task<ResponseModel> DeleteWeakness(int id)
        {
            return await _profiles.DeleteWeakness(id);
        }

    }
}
