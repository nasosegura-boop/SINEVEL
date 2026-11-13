using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace database_api.Dtos
{
    public class LoginDto
    {
        [Required(ErrorMessage = "El número de empleado es obligatorio.")]
        public int No_Empleado { get; set; }

        [Required(ErrorMessage = "La contraseña es obligatoria.")]
        public string Password { get; set; } = string.Empty;
    }
}