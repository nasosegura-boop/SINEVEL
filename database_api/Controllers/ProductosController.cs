using Microsoft.AspNetCore.Mvc;
using SINEVEL.database_api.models;
using SINEVEL.database_api.Dtos;
using SINEVEL.database_api.Data;


namespace SINEVEL.database_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet ("id")]
        public Productos GetProductoById(int id)
        {
            var producto = _context.Productos.FirstOrDefault(p => p.id_producto == id);
            if (producto == null)
            {
                return null;
            }
            return producto;
        }

        [HttpGet ("codigo_barras")]
        public Productos GetProductoByCodigoBarras(string codigo_barras)
        {
            var producto = _context.Productos.FirstOrDefault(p => p.codigo_barras == codigo_barras);
            if (producto == null)
            {
                return null;
            }
            return producto;
        }

        [HttpDelete("id")]
        public bool DeleteProductoById(int id)
        {
            var producto = _context.Productos.FirstOrDefault(p => p.id_producto == id);
            if (producto == null)
            {
                return false;
            }
            _context.Productos.Remove(producto);
            _context.SaveChanges();
            return true;
        }

        [HttpPost]
        public Productos CreateProducto(Productos p)
        {
            _context.Productos.Add(p);
            _context.SaveChanges();
            return p;
        }

        [HttpPut("id")]
        public Productos UpdateProducto(int id, Productos p)
        {
            var producto = _context.Productos.FirstOrDefault(pp => pp.id_producto == id);
            if (producto == null)
            {
                return null;
            }
            _context.Productos.Update(p);
            _context.SaveChanges();
            return p;
        }
    }
}