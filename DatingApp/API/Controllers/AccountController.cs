using System.Security.Cryptography;
using System.Text;
using API.Controllers.Entities;
using API.Data;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers{

    public class AccountController: BaseApiController{

        private readonly DataContext _context;
        public AccountController(DataContext context){
            _context = context;
        }
        [HttpPost("register")] // POST : api/account/register?username=dave&password=pwd
        public async Task<ActionResult<AppUser>> Register(RegisterDTO registerDTO){

            if (await UserExists(registerDTO.Username)) return BadRequest("Username already in use");

            using var hmac = new HMACSHA512();

            var user = new AppUser{
                UserName = registerDTO.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key
            };
            // Not writing to db, just adding to EF memory
            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return user;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(LoginDto loginDto){
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username);

            if (user == null) return Unauthorized("Invalid Username");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++){
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }
            return user;
        }

        private async Task<bool> UserExists(string username){
           return await _context.Users.AnyAsync(x =>x.UserName == username.ToLower());
        }
    }
}