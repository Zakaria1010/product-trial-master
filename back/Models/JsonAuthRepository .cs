using back.Services;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace back.Models
{
    public class JsonAuthRepository : IAuthRepository
    {
        private readonly string _jsonFilePath;
        private List<User> _users;

        public JsonAuthRepository(string jsonFilePath)
        {
            _jsonFilePath = jsonFilePath;
            LoadUsers();
        }

        private void LoadUsers()
        {
            if (File.Exists(_jsonFilePath))
            {
                var json = File.ReadAllText(_jsonFilePath);
                _users = JsonSerializer.Deserialize<List<User>>(json) ?? new List<User>();
            }
            else
            {
                _users = new List<User>();
                SaveUsers();
            }
        }

        private void SaveUsers()
        {
            var json = JsonSerializer.Serialize(_users, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_jsonFilePath, json);
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }

        public async Task<User> Register(User user)
        {
            if (_users.Any(u => u.Email == user.Email))
                throw new Exception("Email already exists");

            user.Id = _users.Any() ? _users.Max(u => u.Id) + 1 : 1;
            user.Password = HashPassword(user.Password);
            _users.Add(user);
            SaveUsers();
            return await Task.FromResult(user);
        }

        public async Task<User> Authenticate(string username, string password)
        {
            var user = _users.FirstOrDefault(u => u.Username == username && u.Password == HashPassword(password));
            return await Task.FromResult(user);
        }

        public async Task<User> GetById(int id)
        {
            return await Task.FromResult(_users.FirstOrDefault(u => u.Id == id));
        }


        public async Task UpdateUser(User user)
        {
            var existing = _users.FirstOrDefault(u => u.Id == user.Id);
            if (existing != null)
            {
                existing.Cart = user.Cart;
                existing.Wishlist = user.Wishlist;
                SaveUsers();
            }
            await Task.CompletedTask;
        }
    }
}
