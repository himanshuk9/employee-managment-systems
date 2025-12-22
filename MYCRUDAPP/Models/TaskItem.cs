namespace MYCRUDAPP.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string Status { get; set; } = "Pending";
        public DateTime? DueDate { get; set; }

        public int AssignedToUserId { get; set; }
        public User? AssignedUser { get; set; }

        public int CreatedByAdminId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
