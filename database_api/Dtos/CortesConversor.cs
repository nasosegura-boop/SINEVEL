using System.Collections.Generic;
using SINEVEL.database_api.models;

namespace SINEVEL.database_api.Dtos
{
    public static class CortesConversor
    {
        public static List<CortesDto> ConvertirDto(this List<Cortes> cortes)
        {
            List<CortesDto> Lista = new List<CortesDto>();
            foreach (var corte in cortes)
            {
                Lista.Add(new CortesDto
                {
                    id_corte = corte.id_corte,
                    monto_anterior = corte.monto_anterior,
                    monto_actual = corte.monto_actual,
                    fecha_inicio = corte.fecha_inicio,
                    fecha_termino = corte.fecha_termino,
                });
            }
            return Lista;
        }     
    }
}