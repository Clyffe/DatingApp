using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class NewMemberRepo(DataContext context) : IMemberRepo
    {
        public async Task<Member?> GetMemberByIdAsync(string id)
        {
           return await context.Members.FindAsync(id);
        }

        public async Task<IReadOnlyList<Photo>> GetMemberPhotosAsync(string memberId)
        {
            return await context.Members.Where(x => x.Id == memberId)
                .SelectMany(x => x.Photos)
                .ToListAsync();
        }

        public async Task<IReadOnlyList<Member>> GetMembersAsync()
        {
            return await context.Members
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(MemberAccessException member)
        {
            context.Entry(member).State = EntityState.Modified;
        }
    }
}
