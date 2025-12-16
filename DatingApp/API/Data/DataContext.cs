using API.Controllers.Entities;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext: DbContext
    {
        //Constructor passing in our connection string
        public DataContext(DbContextOptions options) : base(options) {}

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Member> Members { get; set; }  
        public DbSet<Photo> Photos { get; set; }

        
    }

}