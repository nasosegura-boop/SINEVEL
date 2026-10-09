using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace SINEVEL.database_api.models
{
    public class Productos
    {
        [Key] public int id_producto { get; set; }
        public string producto { get; set; } = string.Empty;
        public string proveedor { get; set; } = string.Empty;
        public decimal cantidad_s1 { get; set; }
        public decimal cantidad_s2 { get; set; }
        public decimal precio { get; set; }
        public string codigo_barras { get; set; } = string.Empty;

        // INVARIANTE DE CLASE: el stock de cada sucursal nunca es negativo.

        /// <summary>
        /// Suma existencias a una sucursal (RE04.3).
        /// PRE:  sucursal es 1 o 2; cantidad > 0.
        /// POST: el stock de esa sucursal aumenta exactamente en 'cantidad'.
        /// </summary>
        public void DarEntrada(int sucursal, decimal cantidad)
        {
            ValidarSucursal(sucursal);
            if (cantidad <= 0)
                throw new ArgumentException("La cantidad debe ser mayor a 0.");

            var antes = ObtenerStock(sucursal);
            AsignarStock(sucursal, antes + cantidad);

            Debug.Assert(ObtenerStock(sucursal) == antes + cantidad, "Postcondición de DarEntrada incumplida");
            AsegurarInvariante();
        }

        /// <summary>
        /// Resta existencias de una sucursal (RE04.4).
        /// PRE:  sucursal es 1 o 2; cantidad > 0; cantidad &lt;= stock actual de esa sucursal.
        /// POST: el stock de esa sucursal disminuye exactamente en 'cantidad' y es >= 0.
        /// </summary>
        public void DarSalida(int sucursal, decimal cantidad)
        {
            ValidarSucursal(sucursal);
            if (cantidad <= 0)
                throw new ArgumentException("La cantidad debe ser mayor a 0.");

            var antes = ObtenerStock(sucursal);
            if (cantidad > antes)
                throw new InvalidOperationException(
                    $"Stock insuficiente en la sucursal {sucursal}: hay {antes} y se piden {cantidad}.");

            AsignarStock(sucursal, antes - cantidad);

            Debug.Assert(ObtenerStock(sucursal) == antes - cantidad, "Postcondición de DarSalida incumplida");
            AsegurarInvariante();
        }

        private static void ValidarSucursal(int sucursal)
        {
            if (sucursal != 1 && sucursal != 2)
                throw new ArgumentException("La sucursal debe ser 1 o 2.");
        }

        private decimal ObtenerStock(int sucursal) => sucursal == 1 ? cantidad_s1 : cantidad_s2;

        private void AsignarStock(int sucursal, decimal valor)
        {
            if (sucursal == 1) cantidad_s1 = valor; else cantidad_s2 = valor;
        }

        private void AsegurarInvariante()
        {
            if (cantidad_s1 < 0 || cantidad_s2 < 0)
                throw new InvalidOperationException("Invariante violada: el stock no puede ser negativo.");
        }
    }
}
