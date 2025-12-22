using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MYCRUDAPP.Migrations
{
    /// <inheritdoc />
    public partial class PasswordHashFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserPassword",
                table: "Users",
                newName: "PasswordHash");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "Users",
                newName: "UserPassword");
        }
    }
}
