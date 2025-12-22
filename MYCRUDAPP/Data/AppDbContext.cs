using Microsoft.EntityFrameworkCore;
using MYCRUDAPP.Models;

namespace MYCRUDAPP.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext>options) : base(options) { }

        public DbSet<User> Users {  get; set; }
        public DbSet<TaskItem> Tasks { get; set; }
    }
}
