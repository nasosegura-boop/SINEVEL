namespace SINEVEL.Dtos
{
    public class Ventas
    {
        public int folio_venta { get; set; }
        public DateTime fecha { get; set; }
        public decimal cobro_final { get; set; }
        public int id_empleado { get; set; }

    }
}