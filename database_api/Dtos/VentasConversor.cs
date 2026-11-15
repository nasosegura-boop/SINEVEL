using System.Collections.Generic;
using SINEVEL.database_api.models;

namespace SINEVEL.database_api.Dtos
{
    public static class VentasConversor
    {
        public static List<VentasDto> ConvertirDto(this List<Ventas> ventas)
        {
            List<VentasDto> Lista = new List<VentasDto>();
            foreach (var venta in ventas)
            {
                Lista.Add(new VentasDto         
                {
                    folio_venta = venta.folio_venta,
                    fecha = venta.fecha,
                    cobro_final = venta.cobro_final,
                });
            }
            return Lista;
        }     
    }
}