using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SINEVEL.database_api.models
{
    public class Cortes
    {
            [Key] public int id_corte { get; set; }
            public decimal monto_anterior { get; set; }
            public decimal monto_actual { get; set; }
            public DateTime fecha_inicio { get; set; }
            public DateTime fecha_termino { get; set; }
    }
}