using SINEVEL.database_api.models;
 
namespace SINEVEL.database_api.Repositories
{
    // Abstracción de acceso a datos: el controlador depende de esto, no de AppDbContext (DIP).
    public interface IProductoRepository
    {
        List<Productos> ObtenerTodos();
        Productos? ObtenerPorId(int id);
        Productos? ObtenerPorCodigoBarras(string codigoBarras);
        void Agregar(Productos producto);
        void Eliminar(Productos producto);
        void Guardar();
    }
}
 