using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MYCRUDAPP.Data;
using System.Security.Claims;

namespace MYCRUDAPP.Controllers
{
    [ApiController]
    [Authorize (Roles ="User")]
    [Route("api/[controller]")]
    public class LeaveRequestController:ControllerBase
    {
        private readonly AppDbContext _context;
        public LeaveRequestController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("createleave")]
        public async Task<IActionResult> Createleave(LeaveRequest dto )
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized("Invalid user id in token");
            }

            var Leave = new LeaveRequest
            {
                UserId = userId,
                FromDate = dto.FromDate,
                ToDate = dto.ToDate,
                Reason = dto.Reason,
            };
            await _context.LeaveRequests.AddAsync(Leave);
            await _context.SaveChangesAsync();
            return Ok(new { meassge="leave request sent succesfuly" });


        }

    }
}
