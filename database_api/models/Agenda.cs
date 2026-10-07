namespace  SINEVEL.Dtos
{
    public class Agenda
    {
        public int folio_cita { get; set; }
        public string cliente { get; set; } = string.Empty;
        public DateTime fecha { get; set; }
        public string contacto_cliente { get; set; } = string.Empty;
        public int id_servicio { get; set; }
        public decimal anticipo { get; set; }
    }
}