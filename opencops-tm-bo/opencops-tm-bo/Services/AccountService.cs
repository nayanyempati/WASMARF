
using Microsoft.EntityFrameworkCore;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Account;
using opencops_tm_bo.Models.Common;

namespace opencops_tm_bo.Services
{
    public class AccountService : IAccount
    {
        private readonly dbCon _dbcon = new dbCon();
        private readonly Cryptography _cryptography = new Cryptography();
        public readonly Messages _messages = new Messages();
        public AccountService(dbCon dbcon)
        {
            _dbcon = dbcon;
        }
        public async Task<ResponseModel> Register(Register model)
        {
            var checkAccountExist = await _dbcon.Users.FirstOrDefaultAsync(x => x.Email == model.Email);
            if (checkAccountExist == null)
            {
                string ActivationKey = _cryptography.HashPassword(Guid.NewGuid().ToString());
                await _dbcon.Users.AddAsync(new Entities.User
                {
                    AccountActivated = false,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    CompanyName = model.CompanyName,
                    LastName = model.LastName,
                    Avatar="",
                    UpdatedOn = DateTime.Now,
                    ResetKeyValidTill = DateTime.Now.AddHours(24),
                    CreatedOn = DateTime.Now,
                    ActivationKey = ActivationKey,
                    PassHash = _cryptography.HashPassword(model.Password),
                    ResetKey = _cryptography.HashPassword(Guid.NewGuid().ToString()),
                });
                await _dbcon.SaveChangesAsync();
                return new ResponseModel { Message = _messages.ACCOUNT_VERIFICATION_MAIL_SENT, Status = _messages.SUCCESS, StatusCode = 201 };
            };
            return new ResponseModel { Message = _messages.CHOOSE_DIFFERENT_EMAIL, Status = _messages.FAILED, StatusCode = 200 };

        }


       public async Task<User?> GetByUserId(int userid)
        {
            return await _dbcon.Users.FirstOrDefaultAsync(x => x.UserId == userid);
        }

        public async Task<User?> CheckAuth(Login model)
        {
            return await _dbcon.Users.FirstOrDefaultAsync(x => x.Email == model.Email && x.PassHash == _cryptography.HashPassword(model.Password));
        }
    }
}
