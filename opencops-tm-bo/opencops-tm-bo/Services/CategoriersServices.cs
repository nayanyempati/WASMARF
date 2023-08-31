using Microsoft.EntityFrameworkCore;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Categories;
using opencops_tm_bo.Models.Common;

namespace opencops_tm_bo.Services
{
    public class CategoriersServices : ICategories
    {
        private readonly dbCon _dbcon = new dbCon();
        private readonly Cryptography _cryptography = new Cryptography();
        public readonly Messages _messages = new Messages();
        public CategoriersServices(dbCon dbcon)
        {
            _dbcon = dbcon;
        }
        public async Task<IList<Category>> Categories()
        {
            return await _dbcon.Categories.ToListAsync();
        }

        public async Task<ResponseModel> CreateCategory(CreateCategoryModel model)
        {
            var checkExist = await _dbcon.Categories.FirstOrDefaultAsync(x=>x.CategoryName==model.CategoryName);
            if (checkExist == null)
            {
                await _dbcon.Categories.AddAsync(new Category
                {
                    CategoryName = model.CategoryName,
                    CategoryDescription = model.CategoryDescription,
                    CreatedOn= DateTime.Now,
                    Token=Guid.NewGuid().ToString()
                });
                await _dbcon.SaveChangesAsync();
                return new ResponseModel { Message = _messages.CATEGORY_CREATED, Status = _messages.SUCCESS, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.CATEGORY_EXIST, Status = _messages.FAILED, StatusCode = 200 };
        }

        public async Task<Category?> CategoryDetails(int categoryid)
        {
            return await _dbcon.Categories.FirstOrDefaultAsync(x=>x.CategoryId==categoryid);
        }

        public async Task<ResponseModel> UpdateCategory(CreateCategoryModel model, int categoryid)
        {
            var checkExist = await _dbcon.Categories.FirstOrDefaultAsync(x => x.CategoryId == categoryid);
            if (checkExist != null)
            {
                checkExist.CategoryDescription = model.CategoryDescription;
                checkExist.CategoryName= model.CategoryName;
                await _dbcon.SaveChangesAsync();
                return new ResponseModel { Message = _messages.CATEGORY_UPDATED, Status = _messages.SUCCESS, StatusCode = 200 };
            }
            return new ResponseModel { Message = _messages.CATEGORY_NOT_FOUND, Status = _messages.FAILED, StatusCode = 200 };
        }
    }
}
