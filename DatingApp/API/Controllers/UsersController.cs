using API.Controllers.Entities;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;

        // Dependancy injection constrctor 
        public UsersController(DataContext context)
        {
            _context = context;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task <ActionResult<AppUser>> GetUser(int id){
            var user = await _context.Users.FindAsync(id);
            return user;
        }        
    }

 }