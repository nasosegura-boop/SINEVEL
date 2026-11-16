using Microsoft.AspNetCore.Mvc;
using SINEVEL.database_api.models;
using SINEVEL.database_api.Dtos;
using SINEVEL.database_api.Data;

namespace SINEVEL.database_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Productos_per_ventaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public Productos_per_ventaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("id")]
        public Productos_per_venta GetProductoPerVentaById(int id)
        {
            var producto = _context.Productos_per_venta.FirstOrDefault(p => p.id_producto == id);
            if (producto == null)
            {
                return null;
            }
            return producto;
        }

        [HttpDelete("{id}")]
        public bool DeleteProductoPerVentaById(int id)
        {
            var producto = _context.Productos_per_venta.FirstOrDefault(p => p.id_producto == id);
            if (producto == null)
            {
                return false;
            }
            _context.Productos_per_venta.Remove(producto);
            _context.SaveChanges();
            return true;
        }

        [HttpPost]
        public Productos_per_venta CreateProductoPerVenta(Productos_per_venta p)
        {
            _context.Productos_per_venta.Add(p);
            _context.SaveChanges();
            return p;
        }

        [HttpPut("{id:int}")]
        public ActionResult<Productos_per_venta> UpdateProductoPerVenta(int id, Productos_per_venta p)
        {
            var producto = _context.Productos_per_venta.FirstOrDefault(pp => pp.id_producto == id);
            if (producto == null) return NotFound();
            producto.cantidad = p.cantidad;
            producto.precio = p.precio;

            _context.SaveChanges();
            return Ok(producto);
        }


    }
}