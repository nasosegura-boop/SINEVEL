namespace SINEVEL.database_api.Dtos
{
    public class ProductosDto
    {
        public int id_producto { get; set; }
        public string producto { get; set; } = string.Empty;
        public string proveedor { get; set; } = string.Empty;
        public decimal cantidad_s1 { get; set; }
        public decimal cantidad_s2 { get; set; }
        public decimal precio { get; set; }
        public string codigo_barras { get; set; } = string.Empty;
    }
}
