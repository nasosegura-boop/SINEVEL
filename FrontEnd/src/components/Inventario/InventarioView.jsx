import { useState } from "react";
import logoLyver from "../../assets/logo-lyver.png";
import {
  PackagePlus,
  PackageMinus,
  PackageSearch,
  Pencil,
  Trash2,
  Search,
  ListFilter,
} from "lucide-react";

const PRODUCTOS_EJEMPLO = Array.from({ length: 10 }).map(() => ({
  codigo: "MS1",
  nombre: "Tinte Anven 7.1 de 300 ml",
  stockS1: 1,
  stockS2: 1,
  costo: 185,
}));

const NAV_ITEMS = [
  { key: "articuloComun", label: "Artículo común" },
  { key: "buscarArticulo", label: "Buscar Artículo" },
  { key: "productos", label: "Productos" },
  { key: "inventario", label: "Inventario" },
  { key: "agendarCita", label: "Agendar cita" },
  { key: "realizarCorte", label: "Realizar Corte" },
];

const ACCIONES = [
  { key: "entrada", label: "Dar Entrada", Icon: PackagePlus },
  { key: "anadir", label: "Añadir Producto", Icon: PackageSearch },
  { key: "modificar", label: "Modificar Producto", Icon: Pencil },
  { key: "salida", label: "Dar Salida", Icon: PackageMinus },
  { key: "eliminar", label: "Eliminar Producto", Icon: Trash2 },
];

export default function InventarioView({
  productos = [],
  cargando = false,
  error = false,
  seleccionadoId = null,
  nombreSeleccionado = "",
  activeNav = "inventario",
  onNavegar = () => { },
  onSeleccionar = () => { },
  onAccion = () => { },
  onBuscar = () => { },
}) {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");

  const handleBuscar = (e) => {
    e.preventDefault();
    onBuscar(codigo.trim(), nombre.trim());
  };

  return (
    <div className="min-h-screen bg-[#3a3a3a] p-3 font-sans text-white sm:p-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[#d79c43]/60 bg-[#454545] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
        <header className="relative grid grid-cols-1 items-center gap-3 overflow-hidden bg-gradient-to-r from-[#3d3d3d] via-[#545454] to-[#3d3d3d] px-6 py-5 sm:grid-cols-3">
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-[#d79c43] to-transparent" />

          <div className="flex items-center gap-2">
            <img
              src={logoLyver}
              alt="Lyver — Distribuidora y Salón de Belleza"
              className="h-14 w-auto object-contain"
            />
          </div>

          <h1 className="text-center text-2xl font-semibold tracking-tight text-white sm:text-[26px]">
            Inventario
          </h1>

          <div className="text-left sm:text-right">
            <p className="text-lg font-extrabold tracking-wide text-white">
              SINEVEL
            </p>
            <p className="text-[10px] leading-snug text-gray-300">
              Sistema de inventariado y ventas electrónico
              <br className="hidden sm:block" /> de productos y servicios de
              belleza
            </p>
          </div>
        </header>

        <nav className="flex flex-wrap gap-2 bg-[#454545] px-4 py-3">
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === activeNav;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onNavegar(item.key)}
                className={[
                  "min-w-[118px] flex-1 rounded-lg px-3 py-2 text-[13px] font-medium transition-all",
                  isActive
                    ? "bg-[#d79c43] text-[#2b2b2b] shadow-[0_4px_14px_-4px_rgba(215,156,67,0.6)]"
                    : "bg-[#5a5a5a]/70 text-gray-100 hover:bg-[#6a6a6a]",
                ].join(" ")}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[1.7fr_1fr]">
          <section className="rounded-xl border border-black/20 bg-white shadow-inner">
            <div className="flex items-center justify-between rounded-t-xl bg-[#004aad] px-4 py-2.5">
              <div className="flex items-center gap-2 text-white">
                <ListFilter size={16} />
                <span className="text-sm font-semibold">
                  Productos en inventario
                </span>
              </div>
              <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs text-white">
                {productos.length} artículos
              </span>
            </div>

            <div className="max-h-[440px] overflow-auto">
              <table className="w-full text-left text-sm text-[#2b2b2b]">
                <thead className="sticky top-0 bg-[#004aad] text-white">
                  <tr>
                    <th className="px-4 py-2 font-medium">Código</th>
                    <th className="px-4 py-2 font-medium">Producto</th>
                    <th className="px-4 py-2 text-center font-medium">Stock S1</th>
                    <th className="px-4 py-2 text-center font-medium">Stock S2</th>
                    <th className="px-4 py-2 text-right font-medium">Costo</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr
                      key={p.id}
                      onClick={() => onSeleccionar(p.id === seleccionadoId ? null : p.id)}
                      className={[
                        "cursor-pointer border-b border-gray-100 transition-colors last:border-0",
                        p.id === seleccionadoId
                          ? "bg-[#fdf3e4] outline outline-1 -outline-offset-1 outline-[#d79c43]"
                          : "hover:bg-[#fdf3e4]",
                      ].join(" ")}
                    >
                      <td className="px-4 py-2 font-mono text-xs text-gray-500">{p.codigo}</td>
                      <td className="px-4 py-2">{p.nombre}</td>
                      <td className="px-4 py-2 text-center">
                        <StockBadge value={p.stockS1} />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <StockBadge value={p.stockS2} />
                      </td>
                      <td className="px-4 py-2 text-right font-medium">
                        ${p.costo?.toFixed ? p.costo.toFixed(2) : p.costo}
                      </td>
                    </tr>
                  ))}
                  {cargando && (
                    <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-400">Cargando inventario...</td></tr>
                  )}
                  {error && (
                    <tr><td colSpan={5} className="px-4 py-10 text-center text-red-500">No se pudo conectar con el servidor.</td></tr>
                  )}
                  {!cargando && !error && productos.length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-400">No se encontraron productos.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <div className="rounded-xl border border-[#d79c43]/30 bg-[#4e4e4e] p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#e3b462]">
                Acciones de inventario
              </p>
              <p className="mb-3 truncate text-xs text-gray-200">
                {nombreSeleccionado ? (
                  <>Seleccionado: <span className="font-semibold text-white">{nombreSeleccionado}</span></>
                ) : (
                  "Selecciona un producto de la tabla"
                )}
              </p>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-2">
                {ACCIONES.map(({ key, label, Icon }, i) => {
                  const isLastOdd =
                    ACCIONES.length % 2 !== 0 && i === ACCIONES.length - 1;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => onAccion(key)}
                      className={[
                        "group flex flex-col items-center gap-1.5 rounded-lg border border-black/10 bg-[#ae864e] px-2 py-3 text-center text-[11.5px] font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#bf9459] hover:shadow-md active:translate-y-0",
                        isLastOdd ? "col-span-2 sm:col-span-1 sm:col-start-2 md:col-span-2 md:col-start-1" : "",
                      ].join(" ")}
                    >
                      <Icon size={18} strokeWidth={2} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <form
              onSubmit={handleBuscar}
              className="rounded-xl border border-[#d79c43]/30 bg-[#4e4e4e] p-4"
            >
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#e3b462]">
                <Search size={14} /> Buscar producto
              </p>

              <div className="space-y-3">
                <Campo
                  label="Código del producto"
                  value={codigo}
                  onChange={setCodigo}
                  placeholder="Ej. MS1"
                />
                <Campo
                  label="Nombre del producto"
                  value={nombre}
                  onChange={setNombre}
                  placeholder="Ej. Tinte Anven 7.1"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-[#d79c43] px-4 py-2.5 text-sm font-semibold text-[#2b2b2b] shadow-[0_4px_14px_-4px_rgba(215,156,67,0.7)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Buscar
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );


  function StockBadge({ value }) {
    const low = Number(value) <= 1;
    return (
      <span
        className={[
          "inline-flex min-w-[28px] justify-center rounded-md px-2 py-0.5 text-xs font-semibold",
          low ? "bg-[#fde3e3] text-[#b23a3a]" : "bg-[#e7f3e7] text-[#2f7a39]",
        ].join(" ")}
      >
        {value}
      </span>
    );
  }

  function Campo({ label, value, onChange, placeholder }) {
    return (
      <label className="block">
        <span className="mb-1 block text-[11px] text-gray-200">{label}</span>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-white/20 bg-[#3d3d3d] px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-[#d79c43] focus:ring-2 focus:ring-[#d79c43]/30"
        />
      </label>
    );
  }
}