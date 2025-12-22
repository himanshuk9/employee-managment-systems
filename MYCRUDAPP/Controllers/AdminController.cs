using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MYCRUDAPP.Data;

namespace MYCRUDAPP.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles ="Admin")]
    public class AdminController:ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController (AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("user")]
        public async Task<IActionResult> getall()
        {
            var user = await _context.Users.ToListAsync();
            return Ok(user);

        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> deleteuser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("not found user");
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok(new { message="User deleted successfully" });
        }
    }
}
