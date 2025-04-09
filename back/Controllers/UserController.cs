using back.Models;
using back.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;
        private readonly IProductRepository _productRepo;

        public UserController(IAuthRepository authRepo, IProductRepository productRepo)
        {
            _authRepo = authRepo;
            _productRepo = productRepo;
        }

        private int GetCurrentUserId() =>
           int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

        // Gestion du panier
        [HttpGet("cart")]
        public async Task<IActionResult> GetCart()
        {
            var user = await _authRepo.GetById(GetCurrentUserId());
            var products = (await _productRepo.GetAllProductsAsync())
                .Where(p => user.Cart.Contains(p.Id));
            return Ok(products);
        }

        [HttpPost("cart/add")]
        public async Task<IActionResult> AddToCart([FromBody] ProductOperationRequest request)
        {
            var user = await _authRepo.GetById(GetCurrentUserId());
            if (!user.Cart.Contains(request.ProductId))
            {
                user.Cart.Add(request.ProductId);
                await _authRepo.UpdateUser(user);
            }
            return Ok();
        }

        [HttpPost("cart/remove")]
        public async Task<IActionResult> RemoveFromCart([FromBody] ProductOperationRequest request)
        {
            var user = await _authRepo.GetById(GetCurrentUserId());
            user.Cart.Remove(request.ProductId);
            await _authRepo.UpdateUser(user);
            return Ok();
        }
    }
}
