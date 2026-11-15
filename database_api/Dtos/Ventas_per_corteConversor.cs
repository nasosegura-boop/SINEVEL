using System.Collections.Generic;
using SINEVEL.database_api.models;

namespace SINEVEL.database_api.Dtos
{
    public static class Ventas_per_corteConversor
    {
        public static List<Ventas_per_corteDto> ConvertirDto(this List<Ventas_per_corte> ventas_per_corte)
        {
            List<Ventas_per_corteDto> Lista = new List<Ventas_per_corteDto>();
            foreach (var venta in ventas_per_corte)
            {
                Lista.Add(new Ventas_per_corteDto
                {
                    folio_venta = venta.folio_venta,
                    id_corte = venta.id_corte,
                    monto = venta.monto,
                });
            }
            return Lista;
        }     
    }
}