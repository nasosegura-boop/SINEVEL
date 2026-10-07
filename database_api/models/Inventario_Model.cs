using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;

namespace database_api.models
{
    [Table("Inventario")]
    public class Inventario_Model
    {
        [Key]
        public int Id_Producto { get; set; }
        public string Producto { get; set; }
        public string Proveedor { get; set; }
        public decimal Cantidad_Sucursal1 { get; set; }
        public decimal Cantidad_Sucursal2 { get; set; }
        public SqlMoney Precio { get; set; }
        public string Codigo_Barras { get; set; }
    }
}
