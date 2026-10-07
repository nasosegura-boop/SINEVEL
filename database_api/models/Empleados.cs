namespace SINEVEL.Dtos
{
    public class Empleados
    {
        public int id_empleado {get; set; }
        public string nombre { get; set; } = string.Empty;
        public string puesto { get; set; } = string.Empty;
        public int telefono { get; set; }
    }
}