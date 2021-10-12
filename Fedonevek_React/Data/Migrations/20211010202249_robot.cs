using Microsoft.EntityFrameworkCore.Migrations;

namespace Fedonevek_React.Data.Migrations
{
    public partial class robot : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "BluePayerRobot",
                table: "Rooms",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "BlueSpyRobot",
                table: "Rooms",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "RedPlayerRobot",
                table: "Rooms",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "RedSpyRobot",
                table: "Rooms",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BluePayerRobot",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "BlueSpyRobot",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "RedPlayerRobot",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "RedSpyRobot",
                table: "Rooms");
        }
    }
}
