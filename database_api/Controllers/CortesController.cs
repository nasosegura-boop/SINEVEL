using Microsoft.AspNetCore.Mvc;
using SINEVEL.database_api.models;
using SINEVEL.database_api.Dtos;
using SINEVEL.database_api.Data;

namespace SINEVEL.database_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CortesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CortesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("id")]
        public Cortes GetCorteById(int id)
        {
            var corte = _context.Cortes.FirstOrDefault(c => c.id_corte == id);
            if (corte == null)
            {
                return null;
            }
            return corte;
        }

        [HttpPost]
        public Cortes CreateCorte(Cortes c)
        {
            _context.Cortes.Add(c);
            _context.SaveChanges();
            return c;
        }
    }
}