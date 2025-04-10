using back.Models;
using back.Services;
using Microsoft.AspNetCore.Mvc;

namespace back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;
        private readonly IConfiguration _configuration;

        public AccountController(IAuthRepository authRepo, IConfiguration configuration)
        {
            _authRepo = authRepo;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            try
            {
                var createdUser = await _authRepo.Register(user);
                return Ok(new { createdUser.Id, createdUser.Username, createdUser.Email });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
