using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MYCRUDAPP.Migrations
{
    /// <inheritdoc />
    public partial class RemoveFilePathFromTasks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FilePath",
                table: "Tasks");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FilePath",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
