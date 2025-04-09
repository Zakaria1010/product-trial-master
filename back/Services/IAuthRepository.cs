using back.Models;

namespace back.Services
{
    public interface IAuthRepository
    {
        Task<User> Register(User user);
        Task<User> Authenticate(string email, string password);
        Task<User> GetById(int id);
        Task UpdateUser(User user);
    }
}
