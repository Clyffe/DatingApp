using API.Controllers.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Entities
{
    // One-to-One relationship with Users
    public class Member
    {
        public string Id { get; set; } = null!;

        public DateOnly DateofBirth { get; set; }

        public string? ImageUrl { get; set; }

        public required string DisplayName { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime LastActive {  get; set; } = DateTime.UtcNow;

        public required string Gender { get; set; } 

        public required string Description { get; set; }

        public required string City { get; set; }

        public required string Country { get; set; } 

        public bool IsDeleted { get; set; }

        //Navigation
        [JsonIgnore]
        public List<Photo> Photos { get; set; } = [];
        [JsonIgnore]
        [ForeignKey(nameof(Id))]
        public AppUser User { get; set; } = null!;
    } 
}
