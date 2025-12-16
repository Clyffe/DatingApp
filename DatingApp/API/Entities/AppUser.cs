

using API.Entities;

namespace API.Controllers.Entities
{
    public class AppUser
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string UserName { get; set; } 

        public string UserEmail { get; set; } 

        public string? ImageURL { get; set; }
        public required byte[] PasswordHash { get; set; }
        public required byte[] PasswordSalt { get; set; }

        // Relationship/Navigation properties

        public Member Member { get; set; } = null!;
    }
}