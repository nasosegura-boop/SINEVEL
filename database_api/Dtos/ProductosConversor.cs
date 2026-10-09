using System.Collections.Generic;
using SINEVEL.database_api.models;

namespace SINEVEL.database_api.Dtos
{
    public static class ProductosConversor
    {
        public static ProductosDto ConvertirDto(this Productos producto)
        {
            return new ProductosDto
            {
                id_producto = producto.id_producto,
                producto = producto.producto,
                proveedor = producto.proveedor,
                cantidad_s1 = producto.cantidad_s1,
                cantidad_s2 = producto.cantidad_s2,
                precio = producto.precio,
                codigo_barras = producto.codigo_barras,
            };
        }

        public static List<ProductosDto> ConvertirDto(this List<Productos> productos)
        {
            var lista = new List<ProductosDto>();
            foreach (var producto in productos)
                lista.Add(producto.ConvertirDto());
            return lista;
        }
    }
}
