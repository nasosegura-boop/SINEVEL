import InventarioView from "../components/Inventario/InventarioView.jsx";
import { buscarProducto, darEntrada, darSalida } from "../services/inventarioApi.js";

export default function InventarioPage() {
  const handleAccion = (key) => {
    if (key === "entrada") darEntrada("MS1", 1);
    if (key === "salida") darSalida("MS1", 1);
  };

  const handleBuscar = (codigo, nombre) => {
    buscarProducto(codigo, nombre);
  };

  return (
    <InventarioView onAccion={handleAccion} onBuscar={handleBuscar} />
  );
}
