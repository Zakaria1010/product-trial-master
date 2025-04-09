using System.Text.Json.Serialization;

namespace back.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Firstname { get; set; }
        public string Email { get; set; }
        [JsonIgnore] public string Password { get; set; }
        public List<int> Cart { get; set; } = new(); // IDs des produits dans le panier
        public List<int> Wishlist { get; set; } = new(); // IDs des produits dans la liste d'envie
    }
}
