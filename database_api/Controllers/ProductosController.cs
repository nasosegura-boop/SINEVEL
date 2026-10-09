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

        [HttpGet]
        public ActionResult<List<ProductosDto>> GetProductos()
        {
            var productos = _context.Productos.ToList();
            return Ok(productos.ConvertirDto());
        }

        [HttpGet("{id:int}")]
        public ActionResult<ProductosDto> GetProductoById(int id)
        {
            var producto = _context.Productos.FirstOrDefault(p => p.id_producto == id);
            if (producto == null) return NotFound();
            return Ok(producto.ConvertirDto());
        }

        [HttpGet("codigo_barras")]
        public ActionResult<ProductosDto> GetProductoByCodigoBarras(string codigo_barras)
        {
            var producto = _context.Productos.FirstOrDefault(p => p.codigo_barras == codigo_barras);
            if (producto == null) return NotFound();
            return Ok(producto.ConvertirDto());
        }

        [HttpPost]
        public ActionResult<ProductosDto> CreateProducto(Productos p)
        {
            if (p.cantidad_s1 < 0 || p.cantidad_s2 < 0 || p.precio < 0)
                return BadRequest("Stock y precio no pueden ser negativos.");

            _context.Productos.Add(p);
            _context.SaveChanges();
            return Ok(p.ConvertirDto());
        }

        [HttpPut("{id:int}")]
        public ActionResult<ProductosDto> UpdateProducto(int id, Productos p)
        {
            if (p.cantidad_s1 < 0 || p.cantidad_s2 < 0 || p.precio < 0)
                return BadRequest("Stock y precio no pueden ser negativos.");

            var producto = _context.Productos.FirstOrDefault(pp => pp.id_producto == id);
            if (producto == null) return NotFound();

            producto.producto = p.producto;
            producto.proveedor = p.proveedor;
            producto.cantidad_s1 = p.cantidad_s1;
            producto.cantidad_s2 = p.cantidad_s2;
            producto.precio = p.precio;
            producto.codigo_barras = p.codigo_barras;

            _context.SaveChanges();
            return Ok(producto.ConvertirDto());
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteProductoById(int id)
        {
            var producto = _context.Productos.FirstOrDefault(p => p.id_producto == id);
            if (producto == null) return NotFound();

            _context.Productos.Remove(producto);
            _context.SaveChanges();
            return NoContent();
        }

        // RE04.3 Dar entrada: la regla de negocio vive en el modelo (Productos.DarEntrada)
        [HttpPost("{id:int}/entrada")]
        public ActionResult<ProductosDto> DarEntrada(int id, MovimientoStockDto mov)
        {
            var producto = _context.Productos.FirstOrDefault(p => p.id_producto == id);
            if (producto == null) return NotFound();

            try { producto.DarEntrada(mov.sucursal, mov.cantidad); }
            catch (ArgumentException ex) { return BadRequest(ex.Message); }

            _context.SaveChanges();
            return Ok(producto.ConvertirDto());
        }

        // RE04.4 Dar salida: rechaza con 409 si no hay stock suficiente
        [HttpPost("{id:int}/salida")]
        public ActionResult<ProductosDto> DarSalida(int id, MovimientoStockDto mov)
        {
            var producto = _context.Productos.FirstOrDefault(p => p.id_producto == id);
            if (producto == null) return NotFound();

            try { producto.DarSalida(mov.sucursal, mov.cantidad); }
            catch (ArgumentException ex) { return BadRequest(ex.Message); }
            catch (InvalidOperationException ex) { return Conflict(ex.Message); }

            _context.SaveChanges();
            return Ok(producto.ConvertirDto());
        }
    }
}
