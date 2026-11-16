using Microsoft.EntityFrameworkCore;
using SINEVEL.database_api.models;

namespace SINEVEL.database_api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Agenda> Agenda { get; set; }
        public DbSet<Cortes> Cortes { get; set; }
        public DbSet<Empleados> Empleados { get; set; }
        public DbSet<Productos> Productos { get; set; }
        public DbSet<Servicios> Servicios { get; set; } 
        public DbSet<Ventas> Ventas { get; set; }
        public DbSet<Ventas_per_corte> Ventas_per_corte { get; set; }
        public DbSet<Productos_per_venta> Productos_per_venta { get; set; }
        

        
        


    }
}