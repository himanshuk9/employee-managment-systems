namespace MYCRUDAPP.DTOs
{
    public class CreateLeaveDto
    {
        public int Id { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string Status { get; set; } = null!;
        public string? AdminRemark { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
