using Microsoft.EntityFrameworkCore.Migrations;

namespace Fedonevek_React.Data.Migrations
{
    public partial class score : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BlueScore",
                table: "Rooms",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RedScore",
                table: "Rooms",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BlueScore",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "RedScore",
                table: "Rooms");
        }
    }
}
