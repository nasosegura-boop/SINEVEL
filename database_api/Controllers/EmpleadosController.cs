using Microsoft.AspNetCore.Mvc;
using SINEVEL.database_api.models;
using SINEVEL.database_api.Dtos;
using SINEVEL.database_api.Data;

namespace SINEVEL.database_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmpleadosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmpleadosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("id")]
        public Empleados GetEmpleadoById(int id)
        {
            var empleado = _context.Empleados.FirstOrDefault(e => e.id_empleado == id);
            if (empleado == null)
            {
                return null;
            }
            return empleado;
        }

        [HttpDelete("{id}")]
        public bool DeleteEmpleadoById(int id)
        {
            var empleado = _context.Empleados.FirstOrDefault(e => e.id_empleado == id);
            if (empleado == null)
            {
                return false;
            }
            _context.Empleados.Remove(empleado);
            _context.SaveChanges();
            return true;
        }

        [HttpPost]
        public Empleados CreateEmpleado(Empleados e)
        {
            _context.Empleados.Add(e);
            _context.SaveChanges();
            return e;
        }

        [HttpPut("{id:int}")]
        public ActionResult<Empleados> UpdateEmpleado(int id, Empleados e)
        {
            var empleado = _context.Empleados.FirstOrDefault(ee => ee.id_empleado == id);
            if (empleado == null) return NotFound();
            empleado.nombre = e.nombre;
            empleado.puesto = e.puesto;
            empleado.telefono = e.telefono;

            _context.SaveChanges();
            return Ok(empleado);
        }

    }
}