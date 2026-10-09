namespace SINEVEL.database_api.Dtos
{
    // Contrato de entrada para dar entrada / dar salida de stock.
    public class MovimientoStockDto
    {
        public int sucursal { get; set; }
        public decimal cantidad { get; set; }
    }
}
