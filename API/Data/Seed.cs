using API.Controllers.Entities;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var memberData = await File.ReadAllTextAsync("Data/UserSeedData.json");
            var members = JsonSerializer.Deserialize<List<Member>>(memberData);

            if (members == null)
            {
                Console.WriteLine("No members in SeedData");
                return;
            }

            foreach (var member in members)
            {
                using var hmac = new HMACSHA512();

                var user = new AppUser
                {
                    Id = member.Id,
                    UserName = member.DisplayName,
                    ImageURL = member.ImageURL,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd")),
                    PasswordSalt = hmac.Key,
                    Member = new Member
                    {
                        Id = member.Id,
                        DisplayName = member.DisplayName,
                        Description = member.Description,
                        DateofBirth = member.DateofBirth,
                        ImageURL = member.ImageURL,
                        Gender = member.Gender,
                        City = member.City,
                        Country = member.Country,
                        LastActive = member.LastActive,
                        CreatedAt = member.CreatedAt,
                        IsDeleted = member.IsDeleted,
                    }
                };

                user.Member.Photos.Add(new Photo
                {
                    Url = member.ImageURL!,
                    MemberId = member.Id
                });

                context.Users.Add(user);
            }

            await context.SaveChangesAsync(); 
        }
    }
}
