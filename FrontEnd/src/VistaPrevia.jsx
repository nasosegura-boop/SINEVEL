import { useState } from "react";
import LoginView from "./components/Login/LoginView";
import InventarioView from "./components/Inventario/InventarioView";
import AgendarCitaView from "./components/AgendaCitas/AgendarCitaView";
import CorteCajaView from "./components/Corte de Caja/CorteCajaView";
import VentaView from "./components/Ventas/VentaView";
import CobroView from "./components/Ventas/CobroView";

/**
 * VistaPrevia — SOLO para ver cómo se ve cada pantalla con datos de ejemplo.
 * No usa la API ni el login real. Se puede borrar cuando haya enrutador.
 */
const PANTALLAS = [
  { key: "login", label: "Login" },
  { key: "inventario", label: "Inventario" },
  { key: "agendarCita", label: "Agendar cita" },
  { key: "realizarCorte", label: "Corte de caja" },
  { key: "articuloComun", label: "Venta" },
  { key: "cobro", label: "Cobro" },
];

export default function VistaPrevia() {
  const [pantalla, setPantalla] = useState("login");

  // La barra de navegación de cada vista también cambia de pantalla
  const ir = (key) => {
    if (PANTALLAS.some((p) => p.key === key)) setPantalla(key);
  };

  return (
    <>
      {pantalla === "login" && <LoginView onLogin={() => ir("inventario")} />}
      {pantalla === "inventario" && <InventarioView onNavegar={ir} />}
      {pantalla === "agendarCita" && <AgendarCitaView onNavegar={ir} />}
      {pantalla === "realizarCorte" && <CorteCajaView onNavegar={ir} />}
      {pantalla === "articuloComun" && (
        <VentaView onNavegar={ir} onCobrar={() => ir("cobro")} />
      )}
      {pantalla === "cobro" && (
        <CobroView onNavegar={ir} onVolver={() => ir("articuloComun")} />
      )}

      <div className="fixed bottom-3 right-3 z-50 max-w-[260px] rounded-lg border border-[#d79c43] bg-[#2b2b2b] px-3 py-2 text-sm text-white shadow-lg">
        {pantalla === "login" && (
          <p className="mb-2 text-xs text-gray-200">
            Para entrar escribe cualquier usuario y contraseña, o elige otra
            pantalla aquí abajo.
          </p>
        )}
        <div className="flex items-center gap-2">
          <label htmlFor="vista-previa">Vista previa:</label>
          <select
            id="vista-previa"
            value={pantalla}
            onChange={(e) => setPantalla(e.target.value)}
            className="rounded bg-white px-2 py-1 text-[#2b2b2b]"
          >
            {PANTALLAS.map((p) => (
              <option key={p.key} value={p.key}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}