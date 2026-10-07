using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SINEVEL.database_api.models
{
    public class Empleados
    {
        
        [Key] public int id_empleado {get; set; }
        public string nombre { get; set; } = string.Empty;
        public string puesto { get; set; } = string.Empty;
        public int telefono { get; set; }
    }
}