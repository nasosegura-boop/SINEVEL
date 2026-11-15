using System.Collections.Generic;
using SINEVEL.database_api.models;

namespace SINEVEL.database_api.Dtos
{
    public static class ServiciosConversor
    {
        public static List<ServicioDto> ConvertirDto(this List<Servicios> servicios)
        {
            List<ServicioDto> Lista = new List<ServicioDto>();
            foreach (var servicio in servicios)
            {
                Lista.Add(new ServicioDto
                {
                    id_servicio = servicio.id_servicio,
                    descripcion = servicio.descripcion,
                    monto = servicio.monto,
                });
            }
            return Lista;
        }     
    }
}