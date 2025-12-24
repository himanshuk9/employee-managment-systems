using System.ComponentModel.DataAnnotations;

public class LeaveRequest
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    public DateTime FromDate { get; set; }

    [Required]
    public DateTime ToDate { get; set; }

    [MaxLength(255)]
    public string? Reason { get; set; }

    [MaxLength(20)]
    public string Status { get; set; } = "Pending";

    [MaxLength(255)]
    // reason / comment store
    public string? AdminRemark { get; set; } 

    public DateTime CreatedAt { get; set; } = DateTime.Now;


}
