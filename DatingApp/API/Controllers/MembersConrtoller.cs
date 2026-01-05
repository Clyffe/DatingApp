using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Authorize]
    public class MembersController(IMemberRepo memberRepository, IPhotoService photoService) : BaseApiController
    {
        [HttpGet] //// locahost:5001/api/members/
        public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
        {
            return Ok(await memberRepository.GetMembersAsync());
        }

        [HttpGet("{id}")] // locahost:5001/api/members/bob-id
        public async Task<ActionResult<Member>> GetMember(string id)
        {
            var member = await memberRepository.GetMemberByIdAsync(id);

            if (member == null) return NotFound();

            return member;
        }

        [HttpGet("{id}/photos")] // locahost:5001/api/members/bob-id/photos
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetMemberPhotos(string id)
        {
            return Ok(await memberRepository.GetMemberPhotosAsync(id));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMember(MemberUpdateDTO memberUpdateDto)
        {
            var memberId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (memberId == null) return BadRequest("Invalid ID");

            var member = await memberRepository.GetMemberForUpdates(memberId);

            if (member == null) return BadRequest("Could not get member");

            member.DisplayName = memberUpdateDto.DisplayName ?? member.DisplayName;
            member.Description = memberUpdateDto.Description ?? member.Description;
            member.City = memberUpdateDto.City ?? member.City;
            member.Country = memberUpdateDto.Country ?? member.Country;

            member.User.UserName = memberUpdateDto.DisplayName ?? member.DisplayName;

            memberRepository.Update(member); // optional

            if (await memberRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update member");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<Photo>> AddPhoto([FromForm] IFormFile file)
        {
            var member = await memberRepository.GetMemberForUpdates(User.GetMemberId());
            if (member == null) return BadRequest("No member found.");

            var result = await photoService.UploadPhotoAsync(file);

            if(result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicID = result.PublicId,
                MemberId = User.GetMemberId()
            };

            if (member.ImageURL == null)
            {
                member.ImageURL = photo.Url;
                member.User.ImageURL = photo.Url;
            }

            member.Photos.Add(photo);

            if (await memberRepository.SaveAllAsync()) return photo;

            return BadRequest("No photo.");
        }


        [HttpPut("set-main-photo/{photoId}")]


        public async Task<ActionResult> SetMainPhoto(int photoId)


        {
            var member = await memberRepository.GetMemberForUpdates(User.GetMemberId());

            if (member == null) return BadRequest("Cannot get member from token");

            var photo = member.Photos.SingleOrDefault(x => x.Id == photoId);

            if (member.ImageURL == photo?.Url || photo == null)
            {

                return BadRequest("Cannot set this as main image");
            }

            member.ImageURL = photo.Url;

            member.User.ImageURL = photo.Url;

            if (await memberRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Problem setting main photo");


        }
    }
}