using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SINEVEL.database_api.models
{
    public class Ventas
    {
        [Key] public int folio_venta { get; set; }
        public DateTime fecha { get; set; }
        public decimal cobro_final { get; set; }
        [ForeignKey("id_empleado")] public int id_empleado { get; set; }

    }
}