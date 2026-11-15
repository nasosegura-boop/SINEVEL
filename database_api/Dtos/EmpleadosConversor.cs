using System.Collections.Generic;
using SINEVEL.database_api.models;

namespace SINEVEL.database_api.Dtos
{
    public static class EmpleadosConversor
    {
        public static List<EmpleadosDto> ConvertirDto(this List<Empleados> empleados    )
        {
            List<EmpleadosDto> Lista = new List<EmpleadosDto>();
            foreach (var empleado in empleados)
            {
                Lista.Add(new EmpleadosDto
                {
                    id_empleado = empleado.id_empleado,
                    nombre = empleado.nombre,
                    puesto = empleado.puesto,
                    telefono = empleado.telefono,
                });
            }
            

            return Lista;
        }     
    }
}