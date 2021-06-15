using Microsoft.EntityFrameworkCore.Migrations;

namespace library.Migrations
{
    public partial class AddedBookUserRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OwnerId",
                table: "Books",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Books_OwnerId",
                table: "Books",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Users_OwnerId",
                table: "Books",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Users_OwnerId",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_OwnerId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Books");
        }
    }
}
