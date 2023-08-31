using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Categories;
using opencops_tm_bo.Models.Common;

namespace opencops_tm_bo.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        public readonly Messages _messages = new Messages();
        private readonly Cryptography _cryptography = new Cryptography();
        private readonly dbCon _dbcon = new dbCon();
        private readonly IUser _user;
        private readonly ICategories _categories;
        private readonly ILogger<CategoriesController> _logger;
        private readonly JWTTokenService _jWTTokenService = new JWTTokenService();

        public CategoriesController(dbCon dbcon, IUser user, ILogger<CategoriesController> logger, ICategories categories)
        {
            _dbcon = dbcon;
            _user = user;
            _logger = logger;
            _categories = categories;
        }

        [HttpGet("list")]
        public async Task<IList<Category>> Categories()
        {
            return await _categories.Categories();

        }

        [HttpPost("create")]
        public async Task<ResponseModel> CreateCategory([FromBody] CreateCategoryModel model)
        {
            return await _categories.CreateCategory(model);
        }

        [HttpGet("details/{categoryid}")]
        public async Task<Category?> CategoryDetails(int categoryid)
        {
            return await _categories.CategoryDetails(categoryid);
        }

        [HttpPut("update/{categoryid}")]
        public async Task<ResponseModel> UpdateCategory([FromBody] CreateCategoryModel model, int categoryid)
        {
            return await _categories.UpdateCategory(model, categoryid);
        }
    }
}
