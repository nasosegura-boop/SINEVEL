
using SINEVEL.database_api.models;
using System.Collections.Generic;

namespace SINEVEL.database_api.Dtos
{
    public static class DtosConversor
    {
        public static productosDto ToDto(this Productos P)
        {
            return new productosDto
            {
                id_producto = P.id_producto,
                producto = P.producto,
                precio = P.precio,
                cantidad_s1 = P.cantidad_s1,
                cantidad_s2 = P.cantidad_s2

            };
        }|
    }
}