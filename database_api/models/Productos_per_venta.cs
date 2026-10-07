namespace  SINEVEL.Dtos
{
    public class Productos_per_venta
    {
        public int folio_venta { get; set; }
        public int id_producto { get; set; }
        public decimal cantidad { get; set; }
        public decimal precio { get; set; }
        public  int id_servicio { get; set; }
    }
}