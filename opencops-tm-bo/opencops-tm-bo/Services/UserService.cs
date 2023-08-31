using Microsoft.EntityFrameworkCore;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;

namespace opencops_tm_bo.Services
{
    public class UserService : IUser
    {
        private readonly dbCon _dbcon = new dbCon();
        private readonly Cryptography _cryptography = new Cryptography();
        public readonly Messages _messages = new Messages();
        public UserService(dbCon dbcon)
        {
            _dbcon = dbcon;
        }
        public async Task<dynamic?> GetByUserId(int userid)
        {
            return await (from U in _dbcon.Users
                          where U.UserId == userid
                          select new
                          {
                              U.FirstName,
                              U.LastName, 
                              U.Email,
                              U.Avatar,
                              U.CompanyName
                          }).FirstOrDefaultAsync();
        }
    }
}
