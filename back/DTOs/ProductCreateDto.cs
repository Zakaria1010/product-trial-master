using System.ComponentModel.DataAnnotations;

namespace back.DTOs
{
    public class ProductCreateDto
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}
