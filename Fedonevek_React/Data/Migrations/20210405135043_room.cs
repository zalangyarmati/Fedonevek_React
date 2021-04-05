using Microsoft.EntityFrameworkCore.Migrations;

namespace Fedonevek_React.Data.Migrations
{
    public partial class room : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Rooms",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Started",
                table: "Rooms",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "Started",
                table: "Rooms");
        }
    }
}
