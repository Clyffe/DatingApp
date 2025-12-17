namespace API.DTOs
{
    public class UserDTO{
        public required string Id {get; set;}
        public string Username {get; set;}
        public string Token {get; set;}
        public string? ImageURL {get; set;}
    }
}