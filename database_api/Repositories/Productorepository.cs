using SINEVEL.database_api.Data;
using SINEVEL.database_api.models;

namespace SINEVEL.database_api.Repositories
{
    public class ProductoRepository : IProductoRepository
    {
        private readonly AppDbContext _context;

        public ProductoRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Productos> ObtenerTodos() => _context.Productos.ToList();

        public Productos? ObtenerPorId(int id) =>
            _context.Productos.FirstOrDefault(p => p.id_producto == id);

        public Productos? ObtenerPorCodigoBarras(string codigoBarras) =>
            _context.Productos.FirstOrDefault(p => p.codigo_barras == codigoBarras);

        public void Agregar(Productos producto) => _context.Productos.Add(producto);

        public void Eliminar(Productos producto) => _context.Productos.Remove(producto);

        public void Guardar() => _context.SaveChanges();
    }
}