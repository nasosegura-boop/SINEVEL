using Microsoft.AspNetCore.Mvc;
using SINEVEL.database_api.models;
using SINEVEL.database_api.Dtos;
using SINEVEL.database_api.Data;

namespace SINEVEL.database_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Ventas_per_corteController : ControllerBase
    {
        private readonly AppDbContext _context;

        public Ventas_per_corteController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("id")]
        public Ventas_per_corte GetVentaPerCorteById(int id)
        {
            var corte = _context.Ventas_per_corte.FirstOrDefault(vc => vc.id_corte == id);
            if (corte == null)
            {
                return null;
            }
            return corte;
        }

        [HttpPost]
        public Ventas_per_corte CreateCorte(Ventas_per_corte c)
        {
            _context.Ventas_per_corte.Add(c);
            _context.SaveChanges();
            return c;
        }
    }
}