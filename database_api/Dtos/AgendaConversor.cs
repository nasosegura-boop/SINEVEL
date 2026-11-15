using System.Collections.Generic;
using SINEVEL.database_api.models;

namespace SINEVEL.database_api.Dtos
{
    public static class AgendaConversor
    {
        public static List<AgendaDto> ConvertirDto(this List<Agenda> agendas)
        {
            List<AgendaDto> Lista = new List<AgendaDto>();
            foreach (var agenda in agendas)
            {
                Lista.Add(new AgendaDto
                {
                    folio_cita = agenda.folio_cita,
                    id_servicio = agenda.id_servicio,
                    cliente = agenda.cliente,
                    fecha = agenda.fecha,
                    contacto_cliente = agenda.contacto_cliente,
                });
            }
            return Lista;
        }     
    }
}