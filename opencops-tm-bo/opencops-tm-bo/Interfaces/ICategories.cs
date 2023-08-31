using opencops_tm_bo.Entities;
using opencops_tm_bo.Models.Categories;
using opencops_tm_bo.Models.Common;

namespace opencops_tm_bo.Interfaces
{
    public interface ICategories
    {
        Task<IList<Category>> Categories();
        Task<Category?> CategoryDetails(int categoryid);
        Task<ResponseModel> CreateCategory(CreateCategoryModel model);
        Task<ResponseModel> UpdateCategory(CreateCategoryModel model, int categoryid);
    }
}
