using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace  SINEVEL.database_api.models
{
    public class Agenda
    {
        
        [Key] public int folio_cita { get; set; }
        public string cliente { get; set; } = string.Empty;
        public DateTime fecha { get; set; }
        public string contacto_cliente { get; set; } = string.Empty;
        [ForeignKey("id_servicio")] public int id_servicio { get; set; }
        public decimal anticipo { get; set; }
    }
}