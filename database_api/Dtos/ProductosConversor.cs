
using System.Collections.Generic;
using SINEVEL.database_api.models;

namespace SINEVEL.database_api.Dtos
{
    public static class ProductosConversor
    {
        public static List<ProductosDto> ConvertirDto(this List<Productos> productos)
        {
            List<ProductosDto> Lista = new List<ProductosDto>();
            foreach (var producto in productos)
            {
                Lista.Add(new ProductosDto
                {
                    id_producto = producto.id_producto,
                    producto = producto.producto,
                    cantidad_s1 = producto.cantidad_s1,
                    cantidad_s2 = producto.cantidad_s2,
                    precio = producto.precio
                });
            }
            return Lista;
        }     
    }
}