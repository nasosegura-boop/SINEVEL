using Microsoft.EntityFrameworkCore;
using SINEVEL.database_api.models;

namespace SINEVEL.database_api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


        // Bloque de inventario
        public DbSet<Productos> Productos { get; set; }
    }
}
