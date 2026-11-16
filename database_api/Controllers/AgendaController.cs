using Microsoft.AspNetCore.Mvc;
using SINEVEL.database_api.models;
using SINEVEL.database_api.Dtos;
using SINEVEL.database_api.Data;

namespace SINEVEL.database_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgendaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AgendaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("id")]
        public Agenda GetAgendaById(int id)
        {
            var agenda = _context.Agenda.FirstOrDefault(a => a.folio_cita == id);
            if (agenda == null)
            {
                return null;
            }
            return agenda;
        }

        [HttpDelete("{id}")]
        public bool DeleteAgendaById(int id)    
        {
            var agenda = _context.Agenda.FirstOrDefault(a => a.folio_cita == id);
            if (agenda == null)
            {
                return false;
            }
            _context.Agenda.Remove(agenda);
            _context.SaveChanges();
            return true;
        }

        [HttpPost]
        public bool CreateAgenda(Agenda agenda)
        {
            _context.Agenda.Add(agenda);
            _context.SaveChanges();
            return true;
        }

    }
}