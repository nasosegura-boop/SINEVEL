using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace database_api.Migrations
{
    /// <inheritdoc />
    public partial class Gola : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Productos",
                columns: table => new
                {
                    id_producto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    producto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    proveedor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    cantidad_s1 = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    cantidad_s2 = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    precio = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    codigo_barras = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Productos", x => x.id_producto);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Productos");
        }
    }
}
