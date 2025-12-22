using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using MYCRUDAPP.Data;
using MYCRUDAPP.DTOs;
using MYCRUDAPP.Models;
using MYCRUDAPP.Services;
using System.Linq;

namespace MYCRUDAPP.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtService _jwtService;

        public AuthController(AppDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        // SIGNUP
        [HttpPost("signup")]
        public IActionResult Signup([FromBody] SignupDto dto)
        {
            if (_context.Users.Any(u => u.UserEmail == dto.UserEmail))
                return BadRequest("Email already exists");

            var user = new User
            {
                UserName = dto.UserName,
                UserEmail = dto.UserEmail,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("User Registered Successfully");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            Console.WriteLine($"Login attempt: {dto.UserEmail} / {dto.Password}");
            var user = _context.Users.SingleOrDefault(u => u.UserEmail == dto.UserEmail);
            if (user == null)
                return Unauthorized("Invalid Email");

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized("Invalid Password");

            var token = _jwtService.GenerateToken(user);
            return Ok(new { token, role = user.Role ?? "User", userName = user.UserName });
        }
    }
}
