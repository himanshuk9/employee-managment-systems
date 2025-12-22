using System.ComponentModel.DataAnnotations;

namespace MYCRUDAPP.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string? UserName { get; set; }

        [Required]
        [EmailAddress]
        public string? UserEmail { get; set; }

        // Store HASHED password only
        [Required]
        public string? PasswordHash { get; set; }

        public string Role { get; set; } = "User";
    }
}
