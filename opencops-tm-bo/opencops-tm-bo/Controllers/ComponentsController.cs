using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Helper;
using opencops_tm_bo.Interfaces;
using opencops_tm_bo.Models.Common;
using opencops_tm_bo.Models.Library;

namespace opencops_tm_bo.Controllers
{
    [Route("api/components")]
    [ApiController]
    public class ComponentsController : ControllerBase
    {
        public readonly Messages _messages = new Messages();
        private readonly Cryptography _cryptography = new Cryptography();
        private readonly dbCon _dbcon = new dbCon();
        private readonly IUser _user;
        private readonly IComponents _components;
        private readonly ILogger<ComponentsController> _logger;
        private readonly JWTTokenService _jWTTokenService = new JWTTokenService();

        public ComponentsController(dbCon dbcon, IUser user, ILogger<ComponentsController> logger, IComponents components)
        {
            _dbcon = dbcon;
            _user = user;
            _logger = logger;
            _components = components;
        }


        [HttpGet("list")]
        public async Task<IList<Component>> Components()
        {
            return await _components.Components();
        }

        [HttpPost("create")]
        public async Task<ResponseModel> CreateComponent([FromBody] CreateComponentModel model)
        {
            return await _components.CreateComponent(model);
        }


        [HttpGet("details/{component_id}")]
        public async Task<Component?> ComponentDetails(int component_id)
        {
            return await _components.ComponentDetails(component_id);
        }



        [HttpPut("updatestatus/{countermeasure_id}/{status}")]
        public async Task<ResponseModel> UpdateComponentStatus(int countermeasure_id, bool status)
        {
            return await _components.UpdateComponentStatus(countermeasure_id, status);
        }

        [HttpGet("listcomponentweakness/{componentid}")]
        public async Task<dynamic> ListComponentWeakness(int componentid)
        {
            return await _components.ListComponentWeakness(componentid);
        }

        [HttpPost("addweakness/{componentid}/{weaknessid}")]
        public async Task<ResponseModel> AddWeakness(int componentid, int weaknessid)
        {
            return await _components.AddWeakness(componentid, weaknessid);
        }


        [HttpDelete("deleteweakness/{componentid}/{id}")]
        public async Task<ResponseModel> DeleteWeakness(int componentid, int id)
        {
            return await _components.DeleteWeakness(componentid, id);
        }
    }
}
