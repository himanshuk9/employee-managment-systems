using System.ComponentModel.DataAnnotations;

namespace MYCRUDAPP.DTOs
{
    public class CreateTaskDto
    {
        [Required]
        [MaxLength(100)]
        public string? Title { get; set; }

        [Required]
        [MaxLength(500)]
        public string? Description { get; set; }

        // Jis user ko task assign karna hai
        [Required]
        public int UserId { get; set; }

       
        // Optional: Due date (future use ke liye)
        public DateTime? DueDate { get; set; }
    }
}
