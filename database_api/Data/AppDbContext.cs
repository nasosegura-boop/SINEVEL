using Microsoft.EntityFrameworkCore;
using database_api.models;

namespace database_api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


        // Bloque de inventario
        public DbSet<Inventario_Model> Inventario { get; set; }
    }
}
