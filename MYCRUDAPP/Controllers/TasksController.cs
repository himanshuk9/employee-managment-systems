using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MYCRUDAPP.Data;
using MYCRUDAPP.DTOs;
using MYCRUDAPP.Models;
using System.Security.Claims;

namespace MYCRUDAPP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController:ControllerBase
    {
        private readonly AppDbContext _context;
        
        public TasksController (AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("assign")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AssignTask(CreateTaskDto dto)
        {
            var adminClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (adminClaim == null)
                return Unauthorized("Admin Id not found in token");

            var adminId = int.Parse(adminClaim.Value);

            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                AssignedToUserId = dto.UserId,
                CreatedByAdminId = adminId,
                DueDate = dto.DueDate
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return Ok("Task Assigned");
        }

        [Authorize(Roles = "User")] // ya Employee
        [HttpGet("mytask")]
        public async Task<IActionResult> MyTasks()
        {
            var userClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userClaim == null)
                return Unauthorized("User Id not found in token");

            var userId = int.Parse(userClaim.Value);

            var tasks = await _context.Tasks
                .Where(t => t.AssignedToUserId == userId)
                .ToListAsync();

            return Ok(tasks);
        }

    }

}
