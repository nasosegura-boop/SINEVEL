using System.Collections.Generic;
using SINEVEL.database_api.models;

namespace SINEVEL.database_api.Dtos
{
    public static class Productos_Per_VentaConversor
    {
        public static List<Productos_per_ventaDto> ConvertirDto(this List<Productos_per_venta> productos_per_venta)
        {
            List<Productos_per_ventaDto> Lista = new List<Productos_per_ventaDto>();
            foreach (var producto in productos_per_venta)
            {
                Lista.Add(new Productos_per_ventaDto
                {
                    folio_venta = producto.folio_venta,
                    id_producto = producto.id_producto,
                    cantidad = producto.cantidad,
                    precio = producto.precio,
                    id_servicio = producto.id_servicio,
                });
            }
            return Lista;
        }     
    }
}