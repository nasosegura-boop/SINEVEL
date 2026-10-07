namespace SINEVEL.Dtos
{
    public class Cortes
    {
            public int id_corte { get; set; }
            public decimal monto_anterior { get; set; }
            public decimal monto_actual { get; set; }
            public DateTime fecha_inicio { get; set; }
            public DateTime fecha_termino { get; set; }
    }
}