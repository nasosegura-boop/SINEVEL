namespace SINEVEL.database_api.Dtos
{
    public class AgendaDto
    {
        public int folio_cita  { get; set; }
        public int id_servicio { get; set; } 
        public string cliente  { get; set; } = string.Empty;
        public DateTime fecha  { get; set; }
        public string contacto_cliente { get; set; } = string.Empty;
    }
}