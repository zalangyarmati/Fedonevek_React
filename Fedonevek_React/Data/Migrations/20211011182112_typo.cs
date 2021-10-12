using Microsoft.EntityFrameworkCore.Migrations;

namespace Fedonevek_React.Data.Migrations
{
    public partial class typo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BluePayerRobot",
                table: "Rooms",
                newName: "BluePlayerRobot");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BluePlayerRobot",
                table: "Rooms",
                newName: "BluePayerRobot");
        }
    }
}
