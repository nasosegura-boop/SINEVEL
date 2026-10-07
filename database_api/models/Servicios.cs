using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SINEVEL.database_api.models
{
    public class Servicios
    {
        [Key] public int id_servicio { get; set; }
        public string descripcion { get; set; } = string.Empty;
        public decimal monto { get; set; }
    }
}