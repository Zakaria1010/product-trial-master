using back.Models;
using back.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repository;
        private readonly IAuthRepository _authRepo;
        public ProductsController(IProductRepository repository, IAuthRepository authRepo)
        {
            _repository = repository;
            _authRepo = authRepo;
        }

        private bool IsAdmin()
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            return email == "admin@admin.com";
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return Ok(await _repository.GetAllProductsAsync());
        }

        // GET: api/products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _repository.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        // POST: api/products
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            if (!IsAdmin())
                return Forbid();
            var createdProduct = await _repository.AddProductAsync(product);
            return CreatedAtAction(nameof(GetProduct), new { id = createdProduct.Id }, createdProduct);
        }

        // PATCH: api/products/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            var existingProduct = await _repository.GetProductByIdAsync(id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            // Mise à jour partielle
            if (!string.IsNullOrEmpty(product.Name))
                existingProduct.Name = product.Name;

            if (!string.IsNullOrEmpty(product.Description))
                existingProduct.Description = product.Description;

            if (product.Price != 0)
                existingProduct.Price = product.Price;

            existingProduct.UpdatedAt = DateTime.UtcNow;

            var updatedProduct = await _repository.UpdateProductAsync(existingProduct);
            if (updatedProduct == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        // DELETE: api/products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _repository.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            await _repository.DeleteProductAsync(id);
            return NoContent();
        }
    }
}
