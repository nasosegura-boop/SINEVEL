using Microsoft.AspNetCore.Mvc;
using SINEVEL.database_api.models;
using SINEVEL.database_api.Dtos;
using SINEVEL.database_api.Repositories;

namespace SINEVEL.database_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly IProductoRepository _repo;

        public ProductosController(IProductoRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public ActionResult<List<ProductosDto>> GetProductos()
        {
            return Ok(_repo.ObtenerTodos().ConvertirDto());
        }

        [HttpGet("{id:int}")]
        public ActionResult<ProductosDto> GetProductoById(int id)
        {
            var producto = _repo.ObtenerPorId(id);
            if (producto == null) return NotFound();
            return Ok(producto.ConvertirDto());
        }

        [HttpGet("codigo_barras")]
        public ActionResult<ProductosDto> GetProductoByCodigoBarras(string codigo_barras)
        {
            var producto = _repo.ObtenerPorCodigoBarras(codigo_barras);
            if (producto == null) return NotFound();
            return Ok(producto.ConvertirDto());
        }

        [HttpPost]
        public ActionResult<ProductosDto> CreateProducto(Productos p)
        {
            if (p.cantidad_s1 < 0 || p.cantidad_s2 < 0 || p.precio < 0)
                return BadRequest("Stock y precio no pueden ser negativos.");

            _repo.Agregar(p);
            _repo.Guardar();
            return Ok(p.ConvertirDto());
        }

        [HttpPut("{id:int}")]
        public ActionResult<ProductosDto> UpdateProducto(int id, Productos p)
        {
            if (p.cantidad_s1 < 0 || p.cantidad_s2 < 0 || p.precio < 0)
                return BadRequest("Stock y precio no pueden ser negativos.");

            var producto = _repo.ObtenerPorId(id);
            if (producto == null) return NotFound();

            producto.producto = p.producto;
            producto.proveedor = p.proveedor;
            producto.cantidad_s1 = p.cantidad_s1;
            producto.cantidad_s2 = p.cantidad_s2;
            producto.precio = p.precio;
            producto.codigo_barras = p.codigo_barras;

            _repo.Guardar();
            return Ok(producto.ConvertirDto());
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteProductoById(int id)
        {
            var producto = _repo.ObtenerPorId(id);
            if (producto == null) return NotFound();

            _repo.Eliminar(producto);
            _repo.Guardar();
            return NoContent();
        }

        // RE04.3 Dar entrada: la regla de negocio vive en el modelo (Productos.DarEntrada)
        [HttpPost("{id:int}/entrada")]
        public ActionResult<ProductosDto> DarEntrada(int id, MovimientoStockDto mov)
        {
            var producto = _repo.ObtenerPorId(id);
            if (producto == null) return NotFound();

            try { producto.DarEntrada(mov.sucursal, mov.cantidad); }
            catch (ArgumentException ex) { return BadRequest(ex.Message); }

            _repo.Guardar();
            return Ok(producto.ConvertirDto());
        }

        // RE04.4 Dar salida: rechaza con 409 si no hay stock suficiente
        [HttpPost("{id:int}/salida")]
        public ActionResult<ProductosDto> DarSalida(int id, MovimientoStockDto mov)
        {
            var producto = _repo.ObtenerPorId(id);
            if (producto == null) return NotFound();

            try { producto.DarSalida(mov.sucursal, mov.cantidad); }
            catch (ArgumentException ex) { return BadRequest(ex.Message); }
            catch (InvalidOperationException ex) { return Conflict(ex.Message); }

            _repo.Guardar();
            return Ok(producto.ConvertirDto());
        }
    }
}