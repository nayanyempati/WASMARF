using opencops_tm_bo.Entities;

namespace opencops_tm_bo.Interfaces
{
    public interface IUser
    {
        Task<dynamic?> GetByUserId(int userid);
    }
}
