using back.Services;
using System.Text.Json;

namespace back.Models
{
    public class JsonProductRepository : IProductRepository
    {
        private readonly string _jsonFilePath;
        private List<Product> _products;

        public JsonProductRepository(string jsonFilePath)
        {
            _jsonFilePath = jsonFilePath;
            LoadProducts();
        }

        private void LoadProducts()
        {
            if (File.Exists(_jsonFilePath))
            {
                var json = File.ReadAllText(_jsonFilePath);
                _products = JsonSerializer.Deserialize<List<Product>>(json) ?? new List<Product>();
            }
            else
            {
                _products = new List<Product>();
                SaveProducts();
            }
        }

        private void SaveProducts()
        {
            var json = JsonSerializer.Serialize(_products, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_jsonFilePath, json);
        }

        public async Task<Product> AddProductAsync(Product product)
        {
            product.Id = _products.Any() ? _products.Max(p => p.Id) + 1 : 1;
            _products.Add(product);
            SaveProducts();
            return await Task.FromResult(product);
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product != null)
            {
                _products.Remove(product);
                SaveProducts();
            }
            await Task.CompletedTask;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await Task.FromResult(_products);
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await Task.FromResult(_products.FirstOrDefault(p => p.Id == id));
        }

        public async Task<Product> UpdateProductAsync(Product product)
        {
            var existingProduct = _products.FirstOrDefault(p => p.Id == product.Id);
            if (existingProduct == null)
                return null;

            existingProduct.Name = product.Name;
            existingProduct.Description = product.Description;
            existingProduct.Price = product.Price;
            existingProduct.UpdatedAt = DateTime.UtcNow;

            SaveProducts();
            return await Task.FromResult(existingProduct);
        }
    }
}
