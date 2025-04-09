using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace back.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string Code { get; set; }
        public string Image { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Quantity { get; set; }
        public string InternalReference { get; set; }
        public int ShellId { get; set; }
        [Range(0, 5)]
        public int Rating { get; set; }

        public InventoryStatus InventoryStatus { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }


    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum InventoryStatus
    {
        INSTOCK,
        LOWSTOCK,
        OUTOFSTOCK
    }

    public static class InventoryStatusExtensions
    {
        public static string ToStringValue(this InventoryStatus status)
        {
            return status switch
            {
                InventoryStatus.INSTOCK => "INSTOCK",
                InventoryStatus.LOWSTOCK => "LOWSTOCK",
                InventoryStatus.OUTOFSTOCK => "OUTOFSTOCK",
                _ => throw new ArgumentOutOfRangeException(nameof(status), status, null)
            };
        }
    }
}
