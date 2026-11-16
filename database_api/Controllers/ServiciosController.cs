using Microsoft.AspNetCore.Mvc;
using SINEVEL.database_api.models;
using SINEVEL.database_api.Dtos;
using SINEVEL.database_api.Data;

namespace SINEVEL.database_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiciosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServiciosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("id")]
        public Servicios GetServicioById(int id)
        {
            var servicio = _context.Servicios.FirstOrDefault(s => s.id_servicio == id);
            if (servicio == null)
            {
                return null;
            }
            return servicio;
        }

        [HttpDelete("{id}")]
        public bool DeleteServicioById(int id)
        {
            var servicio = _context.Servicios.FirstOrDefault(s => s.id_servicio == id);
            if (servicio == null)
            {
                return false;
            }
            _context.Servicios.Remove(servicio);
            _context.SaveChanges();
            return true;
        }

        [HttpPost]
        public Servicios CreateServicio(Servicios s)
        {
            _context.Servicios.Add(s);
            _context.SaveChanges();
            return s;
        }

        [HttpPut("{id:int}")]
        public ActionResult<Servicios> UpdateServicio(int id, Servicios s)
        {
            var servicio = _context.Servicios.FirstOrDefault(ss => ss.id_servicio == id);
            if (servicio == null) return NotFound();
            servicio.descripcion = s.descripcion;
            servicio.monto = s.monto;

            _context.SaveChanges();
            return Ok(servicio);
        }

    }
}