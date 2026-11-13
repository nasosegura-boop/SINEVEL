using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace database_api.models
{
    [Table("usuario")]
    public class Usuario
    {
        // Relación 1 a 1, la misma llave primaria actúa como llave foránea
        [Key]
        [ForeignKey("Empleados")]
        public int id_empleado { get; set; }
        [MaxLength(16)]
        public string Password { get; set; } = string.Empty;
        public string Rol {get; set;}

        // Puentes de Navegación

        public virtual Empleados Empleados { get; set; } = null!;
    }
}