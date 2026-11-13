using database_api.Data;
using database_api.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace database_api.Controllers
{
    [Route("api/[controller]")] 
    [ApiController]
    public class AuthController : ControllerBase
    {
            private readonly AppDbContext _context;
            public AuthController(AppDbContext context)
            {
                _context = context;
            }

            [HttpPost("login")]
            public async Task<IActionResult> Login([FromBody] LoginDto credenciales)
            {
                // Busca el usurio en la base de datos
                var usuario = await _context.Usuarios
                    .FirstOrDefaultAsync(u => u.id_empleado == credenciales.id_empleado);

                // No encontro el usuario
                if (usuario == null)
                {
                    return NotFound(new { mensaje = "El ususario no existe" });
                }

                // Comparacion de contraseñas
                if (usuario.Password != credenciales.Password)
                {
                    return Unauthorized(new { mensaje = "La contraseña es incorrecta" }); 
                }

                return Ok(new
                {
                    mensaje = "Inicio de sesión exitoso",
                    idUsuario = usuario.No_Empleado,
                    rol = usuario.Rol.ToString() 
                });
            }
     }
}