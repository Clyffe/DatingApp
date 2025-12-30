using API.Entities;

namespace API.Interfaces
{
    public interface IMemberRepo
    {
        void Update(Member member);

        Task<bool> SaveAllAsync();  
        Task<IReadOnlyList<Member>> GetMembersAsync();
        Task<Member?> GetMemberByIdAsync(string id);
        Task<IReadOnlyList<Photo>> GetMemberPhotosAsync(string memberId);
        Task<Member?>GetMemberForUpdates(string memberId);
    }
}
