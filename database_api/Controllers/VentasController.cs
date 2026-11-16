using Microsoft.AspNetCore.Mvc;
using SINEVEL.database_api.models;
using SINEVEL.database_api.Dtos;
using SINEVEL.database_api.Data;

namespace SINEVEL.database_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VentasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VentasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("id")]
        public Ventas GetVentaById(int id)
        {
            var venta = _context.Ventas.FirstOrDefault(v => v.folio_venta == id);
            if (venta == null)
            {
                return null;
            }
            return venta;
        }

        [HttpDelete("{id}")]
        public bool DeleteVentaById(int id)
        {
            var venta = _context.Ventas.FirstOrDefault(v => v.folio_venta == id);
            if (venta == null)
            {
                return false;
            }
            _context.Ventas.Remove(venta);
            _context.SaveChanges();
            return true;
        }

        [HttpPost]
        public Ventas CreateVenta(Ventas v  )
        {
            _context.Ventas.Add(v);
            _context.SaveChanges();
            return v;
        }
    }
}