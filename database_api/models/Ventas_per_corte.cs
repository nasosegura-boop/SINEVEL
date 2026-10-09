using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SINEVEL.database_api.models
{
    public class Ventas_per_corte
    {
        [ForeignKey("folio_venta")] public int folio_venta { get; set; }
        [Key] public int id_corte { get; set; }
        public decimal monto { get; set; }
    }

}