namespace SINEVEL.database_api.Dtos
{
    public class ProductosDto
    {

        public string producto { get; set; } = string.Empty;
        public string proveedor { get; set; } = string.Empty;
        public decimal cantidad_s1 { get; set; }
        public decimal cantidad_s2 { get; set; }
        public decimal precio { get; set; }

    }
}