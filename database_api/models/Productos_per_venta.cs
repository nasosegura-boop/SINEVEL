using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace  SINEVEL.database_api.models
{
    public class Productos_per_venta
    {
        [Key] public int folio_venta { get; set; }
        [ForeignKey("id_producto")] public int id_producto { get; set; }
        public decimal cantidad { get; set; }
        public decimal precio { get; set; }
        [ForeignKey("id_servicio")] public  int id_servicio { get; set; }
    }
}