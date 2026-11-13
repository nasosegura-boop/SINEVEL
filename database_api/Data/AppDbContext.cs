using Microsoft.EntityFrameworkCore;
using SINEVEL.database_api.models;

namespace SINEVEL.database_api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Bloque de Personal y Usuarios
        public DbSet<Personal_Model> Empleados { get; set; }
        public DbSet<Usuario_Model> Usuarios { get; set; }

        // Bloque de inventario
        public DbSet<Productos> Productos { get; set; }
    }
}