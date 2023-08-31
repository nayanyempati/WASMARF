using Microsoft.AspNetCore.Mvc;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Models.Account;
using opencops_tm_bo.Models.Common;

namespace opencops_tm_bo.Interfaces
{
    public interface IAccount
    {
        Task<User?> GetByUserId(int userid);
        Task<ResponseModel> Register(Register model);
        Task<User?> CheckAuth(Login model);  
    }
}
