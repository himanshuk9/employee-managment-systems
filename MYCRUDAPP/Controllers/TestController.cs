using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JwtMvcAuth.Controllers
{
    [Authorize]   // 🔐 User + Admin dono
    public class TestController : Controller
    {
        // 🔹 Any logged-in user
        [HttpGet("secure-data")]
        public IActionResult SecureData()
        {
            return Ok("You accessed a protected route!");
        }

        // 🔹 Only Admin
        [Authorize(Roles = "Admin")]
        [HttpGet("admin-dashboard")]
        public IActionResult AdminDashboard()
        {
            return Ok("Welcome Admin 🎉");
        }
    }
}
