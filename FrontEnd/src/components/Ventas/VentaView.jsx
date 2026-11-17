import { useState, useId } from "react";
import {
  ScanBarcode,
  Plus,
  PackageSearch,
  Pencil,
  Trash2,
  Settings,
  Ban,
  Wallet,
  Printer,
  History,
  AlertCircle,
  ShoppingCart,
} from "lucide-react";
import logoLyver from "../../assets/logo-lyver.png";

/**
 * VentaView — Vista (V de MVC) del Registro de Ventas de S.I.N.E.V.E.L. (CU2).
 *
 * Solo vista: no busca productos, no calcula descuentos ni guarda ventas.
 * Recibe los datos y los manejadores desde el Controlador / página que la use.
 *
 * Props:
 * - empleado: nombre de quien atiende (se muestra en el encabezado)
 * - articulos: Array<{ id, cantidad, nombre, precio }> (precio unitario)
 * - total: total de la venta (si no se manda, se suma en la vista solo para mostrarlo)
 * - seleccionadoId, onSeleccionar(id)
 * - onAgregar(codigo): se llama al enviar un código (también con lector de código de barras)
 * - onVerificar(), onModificar(), onBorrar(), onConfiguracion()
 * - onCancelarVenta(), onCobrar()
 * - ultimaVenta: { productos: string[], total }
 * - onReimprimir(), onVerRegistro()
 * - error: mensaje del servidor (por ejemplo, "Producto no encontrado")
 *
 * Paleta oficial (Anexo B): #545454, #d79c43, #ae864e, #004aad, #ffffff
 */

const NAV_ITEMS = [
  { key: "articuloComun", label: "Artículo común" },
  { key: "buscarArticulo", label: "Buscar Artículo" },
  { key: "productos", label: "Productos" },
  { key: "inventario", label: "Inventario" },
  { key: "agendarCita", label: "Agendar cita" },
  { key: "realizarCorte", label: "Realizar Corte" },
];

// Datos de ejemplo para ver la vista sin backend (como en el prototipo)
const ARTICULOS_EJEMPLO = [
  { id: 1, cantidad: 2, nombre: "Tinte Anven 7.1 de 300 ml", precio: 185 },
  { id: 2, cantidad: 1, nombre: "Shampoo reparador 500 ml", precio: 240 },
  { id: 3, cantidad: 1, nombre: "Corte de cabello", precio: 150 },
];
const ULTIMA_VENTA_EJEMPLO = {
  productos: ["Producto 1", "Producto 2", "Producto 3", "Producto 4", "Producto 5"],
  total: 1000,
};

const moneda = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
const dinero = (v) => moneda.format(v ?? 0);

export default function VentaView({
  empleado = "Empleado de ejemplo",
  articulos = ARTICULOS_EJEMPLO,
  total,
  seleccionadoId = null,
  ultimaVenta = ULTIMA_VENTA_EJEMPLO,
  error = "",
  activeNav = "",
  onNavegar = () => {},
  onSeleccionar = () => {},
  onAgregar = () => {},
  onVerificar = () => {},
  onModificar = () => {},
  onBorrar = () => {},
  onConfiguracion = () => {},
  onCancelarVenta = () => {},
  onCobrar = () => {},
  onReimprimir = () => {},
  onVerRegistro = () => {},
}) {
  const [codigo, setCodigo] = useState("");
  const [errorCodigo, setErrorCodigo] = useState("");
  const [confirmandoCancelar, setConfirmandoCancelar] = useState(false);

  const idCodigo = useId();

  const hayArticulos = articulos.length > 0;
  const haySeleccion = seleccionadoId != null;
  const totalMostrado =
    total ?? articulos.reduce((suma, a) => suma + a.cantidad * a.precio, 0);

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!codigo.trim()) {
      setErrorCodigo("Escribe o escanea un código de producto.");
      return;
    }
    setErrorCodigo("");
    onAgregar(codigo.trim());
    setCodigo("");
  };

  return (
    <div className="min-h-screen bg-[#3a3a3a] p-3 font-sans text-white sm:p-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[#d79c43]/60 bg-[#454545] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
        {/* Encabezado */}
        <header className="relative grid grid-cols-1 items-center gap-3 overflow-hidden bg-gradient-to-r from-[#3d3d3d] via-[#545454] to-[#3d3d3d] px-6 py-5 sm:grid-cols-3">
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-[#d79c43] to-transparent" />

          <div className="flex items-center gap-2">
            <img
              src={logoLyver}
              alt="Lyver — Distribuidora y Salón de Belleza"
              className="h-28 w-auto object-contain"
            />
          </div>

          <h1 className="text-center text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Lo atiende: {empleado}
          </h1>

          <div className="text-left sm:text-right">
            <p className="text-lg font-extrabold tracking-wide text-white">SINEVEL</p>
            <p className="text-[10px] leading-snug text-gray-300">
              Sistema de inventariado y ventas electrónico
              <br className="hidden sm:block" /> de productos y servicios de belleza
            </p>
          </div>
        </header>

        {/* Navegación */}
        <nav className="flex flex-wrap gap-2 bg-[#454545] px-4 py-3">
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === activeNav;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onNavegar(item.key)}
                aria-current={isActive ? "page" : undefined}
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

        {/* Cuerpo */}
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[1.6fr_1fr]">
          {/* Venta en curso */}
          <section className="flex flex-col gap-3">
            <div className="rounded-xl border border-black/20 bg-white shadow-inner">
              <div className="flex items-center justify-between rounded-t-xl bg-[#004aad] px-4 py-2.5">
                <div className="flex items-center gap-2 text-white">
                  <ShoppingCart size={16} aria-hidden="true" />
                  <h2 className="text-sm font-semibold">Venta en curso</h2>
                </div>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs text-white">
                  {articulos.length} {articulos.length === 1 ? "artículo" : "artículos"}
                </span>
              </div>

              <div className="max-h-[300px] overflow-auto">
                <table className="w-full text-left text-sm text-[#2b2b2b]">
                  <thead className="sticky top-0 bg-[#004aad] text-white">
                    <tr>
                      <th className="w-10 px-3 py-2">
                        <span className="sr-only">Seleccionar</span>
                      </th>
                      <th className="px-3 py-2 text-center font-medium">Cantidad</th>
                      <th className="px-3 py-2 font-medium">Producto</th>
                      <th className="px-3 py-2 text-right font-medium">Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articulos.map((a) => {
                      const seleccionado = a.id === seleccionadoId;
                      return (
                        <tr
                          key={a.id}
                          onClick={() => onSeleccionar(a.id)}
                          className={[
                            "cursor-pointer border-b border-gray-100 transition-colors last:border-0",
                            seleccionado ? "bg-[#004aad] text-white" : "hover:bg-[#fdf3e4]",
                          ].join(" ")}
                        >
                          <td className="px-3 py-2">
                            <input
                              type="radio"
                              name="articulo-seleccionado"
                              checked={seleccionado}
                              onChange={() => onSeleccionar(a.id)}
                              aria-label={`Seleccionar ${a.nombre}`}
                              className="h-4 w-4 accent-[#d79c43]"
                            />
                          </td>
                          <td className="px-3 py-2 text-center">{a.cantidad}</td>
                          <td className="px-3 py-2">{a.nombre}</td>
                          <td className="px-3 py-2 text-right font-medium">{dinero(a.precio)}</td>
                        </tr>
                      );
                    })}
                    {!hayArticulos && (
                      <tr>
                        <td colSpan={4} className="px-4 py-10 text-center text-gray-500">
                          Escanea o escribe un código para agregar el primer artículo.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-baseline justify-between border-t border-gray-200 px-4 py-3">
                <span className="text-lg font-bold text-[#2b2b2b]">Total:</span>
                <span className="text-2xl font-bold text-[#004aad]">{dinero(totalMostrado)}</span>
              </div>
            </div>

            {/* Acciones sobre artículos */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <AccionBoton Icon={PackageSearch} label="Verificar artículo" onClick={onVerificar} />
              <AccionBoton
                Icon={Pencil}
                label="Modificar artículo"
                disabled={!haySeleccion}
                onClick={onModificar}
              />
              <AccionBoton
                Icon={Trash2}
                label="Borrar artículo"
                disabled={!haySeleccion}
                onClick={onBorrar}
              />
              <AccionBoton Icon={Settings} label="Configuración" onClick={onConfiguracion} />
            </div>
            {hayArticulos && !haySeleccion && (
              <p className="-mt-1 text-xs text-gray-300">
                Selecciona un artículo de la tabla para modificarlo o borrarlo.
              </p>
            )}

            {/* Captura de código y cobro */}
            <form
              onSubmit={handleAgregar}
              noValidate
              className="rounded-xl border border-[#d79c43]/30 bg-[#4e4e4e] p-4"
            >
              <label htmlFor={idCodigo} className="mb-1 block text-sm font-medium text-gray-100">
                Código del producto
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <ScanBarcode
                    size={16}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    id={idCodigo}
                    type="text"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    autoComplete="off"
                    autoFocus
                    aria-invalid={errorCodigo ? "true" : "false"}
                    aria-describedby={errorCodigo ? `${idCodigo}-error` : undefined}
                    placeholder="Escanea o escribe el código"
                    className="w-full rounded-md border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm text-[#2b2b2b] outline-none transition-colors placeholder:text-gray-500 focus:border-[#d79c43] focus:ring-2 focus:ring-[#d79c43]/40"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-[#ae864e] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#bf9459] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d79c43]"
                >
                  <Plus size={16} aria-hidden="true" />
                  Agregar
                </button>
              </div>
              {errorCodigo && (
                <p
                  id={`${idCodigo}-error`}
                  className="mt-1 flex items-center gap-1.5 text-xs text-[#ffb4b4]"
                >
                  <AlertCircle size={14} aria-hidden="true" />
                  {errorCodigo}
                </p>
              )}

              {error && (
                <div
                  role="alert"
                  className="mt-3 flex items-start gap-2 rounded-lg border border-[#ffb4b4]/40 bg-[#5a3a3a] px-3 py-2 text-sm text-[#ffd5d5]"
                >
                  <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  disabled={!hayArticulos}
                  onClick={() => setConfirmandoCancelar(true)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/40 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d79c43] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <Ban size={16} aria-hidden="true" />
                  Cancelar venta
                </button>
                <button
                  type="button"
                  disabled={!hayArticulos}
                  onClick={onCobrar}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#d79c43] px-4 py-2.5 text-sm font-semibold text-[#2b2b2b] shadow-[0_4px_14px_-4px_rgba(215,156,67,0.7)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4e4e4e] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <Wallet size={16} aria-hidden="true" />
                  Cobrar
                </button>
              </div>

              {confirmandoCancelar && hayArticulos && (
                <div
                  role="alert"
                  className="mt-3 rounded-lg border border-[#ffb4b4]/40 bg-[#5a3a3a] p-3 text-sm text-[#ffd5d5]"
                >
                  <p>¿Cancelar la venta? Se quitarán todos los artículos.</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onCancelarVenta();
                        setConfirmandoCancelar(false);
                      }}
                      className="rounded-md bg-[#d79c43] px-3 py-1.5 text-xs font-semibold text-[#2b2b2b] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      Sí, cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmandoCancelar(false)}
                      className="rounded-md border border-white/40 px-3 py-1.5 text-xs font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      Volver a la venta
                    </button>
                  </div>
                </div>
              )}
            </form>
          </section>

          {/* Última venta */}
          <section className="flex flex-col gap-4 rounded-xl border border-[#d79c43]/30 bg-[#4e4e4e] p-4">
            <div>
              <h2 className="text-2xl font-semibold">Registro de ventas</h2>
              <p className="mt-1 text-lg font-medium text-[#e3b462]">Última venta</p>
            </div>

            <ul className="flex-1 space-y-1 border-t border-white/20 pt-3 text-base font-medium">
              {ultimaVenta?.productos?.length > 0 ? (
                ultimaVenta.productos.map((p, i) => <li key={`${p}-${i}`}>{p}</li>)
              ) : (
                <li className="text-sm font-normal text-gray-300">Aún no hay ventas registradas.</li>
              )}
            </ul>

            <div className="flex items-baseline justify-between border-t border-white/20 pt-3">
              <span className="text-lg font-medium">Total</span>
              <span className="text-xl font-bold">{dinero(ultimaVenta?.total)}</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              <button
                type="button"
                onClick={onReimprimir}
                disabled={!ultimaVenta?.productos?.length}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#d79c43] px-3 py-2.5 text-sm font-semibold text-[#2b2b2b] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                <Printer size={16} aria-hidden="true" />
                Re-imprimir ticket
              </button>
              <button
                type="button"
                onClick={onVerRegistro}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#d79c43] px-3 py-2.5 text-sm font-semibold text-[#2b2b2b] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <History size={16} aria-hidden="true" />
                Ver registro del día
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function AccionBoton({ Icon, label, disabled = false, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 rounded-lg border border-black/10 bg-[#ae864e] px-2 py-3 text-center text-[11.5px] font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#bf9459] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d79c43] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-[#ae864e]"
    >
      <Icon size={18} strokeWidth={2} aria-hidden="true" />
      {label}
    </button>
  );
}
