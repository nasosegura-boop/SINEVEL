import { useState, useId } from "react";
import {
  FileText,
  Save,
  Printer,
  Trash2,
  AlertCircle,
  Loader2,
  PieChart,
  ShoppingBag,
} from "lucide-react";
import logoLyver from "../../assets/logo-lyver.png";

/**
 * CorteCajaView — Vista (V de MVC) del módulo de Corte de Caja de S.I.N.E.V.E.L.
 *
 * Solo vista: no calcula el corte ni consulta la base de datos. Recibe los datos
 * ya calculados y los manejadores desde el Controlador / página que la use.
 *
 * Props:
 * - productosVendidos: Array<{ codigo, nombre, cantidad, costo }>
 * - masVendidos: Array<{ nombre, cantidad }> (alimenta la gráfica de pastel)
 * - resumen: { idCorte, retiros, depositos, ventas, subtotal, descuentos, iva, ganancias, total }
 *            (vacío o null mientras no se haya generado un corte)
 * - onGenerar(desde, hasta): fechas en formato AAAA-MM-DD
 * - onRespaldar(), onImprimir(), onBorrar()
 * - error: mensaje del servidor; cargando: true mientras se genera el corte
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

const COLORES_PASTEL = [
  "#4472c4",
  "#4aa564",
  "#f0a030",
  "#e0506a",
  "#8e4f9e",
  "#a77a4c",
  "#d062a8",
];

// Datos de ejemplo para ver la vista sin backend (como en el prototipo)
const VENDIDOS_EJEMPLO = Array.from({ length: 6 }, () => ({
  codigo: "MS1",
  nombre: "Tinte Anven 7.1 de 300 ml",
  cantidad: 1,
  costo: 185,
}));
const MAS_VENDIDOS_EJEMPLO = [
  { nombre: "Producto 1", cantidad: 23 },
  { nombre: "Producto 2", cantidad: 19 },
  { nombre: "Producto 3", cantidad: 9 },
  { nombre: "Producto 4", cantidad: 7 },
  { nombre: "Producto 5", cantidad: 19 },
  { nombre: "Producto 6", cantidad: 16 },
  { nombre: "Producto 7", cantidad: 7 },
];
const RESUMEN_EJEMPLO = {
  idCorte: "C-0001",
  retiros: 200,
  depositos: 500,
  ventas: 1110,
  subtotal: 956.9,
  descuentos: 0,
  iva: 153.1,
  ganancias: 420,
  total: 1110,
};

const moneda = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
const dinero = (v) => (v == null ? "" : moneda.format(v));

export default function CorteCajaView({
  productosVendidos = VENDIDOS_EJEMPLO,
  masVendidos = MAS_VENDIDOS_EJEMPLO,
  resumen = RESUMEN_EJEMPLO,
  error = "",
  cargando = false,
  activeNav = "realizarCorte",
  onNavegar = () => {},
  onGenerar = () => {},
  onRespaldar = () => {},
  onImprimir = () => {},
  onBorrar = () => {},
}) {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [errores, setErrores] = useState({});
  const [confirmandoBorrado, setConfirmandoBorrado] = useState(false);

  const idDesde = useId();
  const idHasta = useId();

  const corteGenerado = Boolean(resumen?.idCorte);

  const handleGenerar = (e) => {
    e.preventDefault();

    // Validación de captura en la vista. Los cálculos los hace el backend.
    const nuevos = {};
    if (!desde) nuevos.desde = "Elige la fecha de inicio.";
    if (!hasta) nuevos.hasta = "Elige la fecha de fin.";
    if (desde && hasta && desde > hasta)
      nuevos.hasta = "La fecha final no puede ser anterior a la inicial.";
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    onGenerar(desde, hasta);
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

          <h1 className="text-center text-2xl font-semibold tracking-tight text-white sm:text-[26px]">
            Corte de Caja
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
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[1.4fr_1fr]">
          {/* Columna izquierda: productos vendidos y gráfica */}
          <section className="flex flex-col gap-4">
            <div className="rounded-xl border border-black/20 bg-white shadow-inner">
              <div className="flex items-center justify-between rounded-t-xl bg-[#004aad] px-4 py-2.5">
                <div className="flex items-center gap-2 text-white">
                  <ShoppingBag size={16} aria-hidden="true" />
                  <h2 className="text-sm font-semibold">Productos vendidos</h2>
                </div>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs text-white">
                  {productosVendidos.length} artículos
                </span>
              </div>

              <div className="max-h-[260px] overflow-auto">
                <table className="w-full text-left text-sm text-[#2b2b2b]">
                  <thead className="sticky top-0 bg-[#004aad] text-white">
                    <tr>
                      <th className="px-4 py-2 font-medium">Código</th>
                      <th className="px-4 py-2 font-medium">Producto</th>
                      <th className="px-4 py-2 text-center font-medium">Cantidad</th>
                      <th className="px-4 py-2 text-right font-medium">Costo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosVendidos.map((p, i) => (
                      <tr
                        key={`${p.codigo}-${i}`}
                        className="border-b border-gray-100 transition-colors last:border-0 hover:bg-[#fdf3e4]"
                      >
                        <td className="px-4 py-2 font-mono text-xs text-gray-500">{p.codigo}</td>
                        <td className="px-4 py-2">{p.nombre}</td>
                        <td className="px-4 py-2 text-center">{p.cantidad}</td>
                        <td className="px-4 py-2 text-right font-medium">{dinero(p.costo)}</td>
                      </tr>
                    ))}
                    {productosVendidos.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                          No hay ventas en el periodo elegido.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-black/20 bg-white shadow-inner">
              <div className="flex items-center gap-2 rounded-t-xl bg-[#004aad] px-4 py-2.5 text-white">
                <PieChart size={16} aria-hidden="true" />
                <h2 className="text-sm font-semibold">Gráfico de productos más vendidos</h2>
              </div>
              <GraficoPastel datos={masVendidos} />
            </div>
          </section>

          {/* Columna derecha: acciones y resumen */}
          <section className="flex flex-col gap-4">
            <form
              onSubmit={handleGenerar}
              noValidate
              className="rounded-xl border border-[#d79c43]/30 bg-[#4e4e4e] p-4"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#e3b462]">
                Periodo del corte
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                <div>
                  <label htmlFor={idDesde} className="mb-1 block text-sm font-medium text-gray-100">
                    Desde
                  </label>
                  <input
                    id={idDesde}
                    type="date"
                    value={desde}
                    onChange={(e) => setDesde(e.target.value)}
                    aria-invalid={errores.desde ? "true" : "false"}
                    aria-describedby={errores.desde ? `${idDesde}-error` : undefined}
                    className={CLASE_INPUT}
                  />
                  {errores.desde && <MensajeError id={`${idDesde}-error`} texto={errores.desde} />}
                </div>
                <div>
                  <label htmlFor={idHasta} className="mb-1 block text-sm font-medium text-gray-100">
                    Hasta
                  </label>
                  <input
                    id={idHasta}
                    type="date"
                    value={hasta}
                    onChange={(e) => setHasta(e.target.value)}
                    aria-invalid={errores.hasta ? "true" : "false"}
                    aria-describedby={errores.hasta ? `${idHasta}-error` : undefined}
                    className={CLASE_INPUT}
                  />
                  {errores.hasta && <MensajeError id={`${idHasta}-error`} texto={errores.hasta} />}
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mt-3 flex items-start gap-2 rounded-lg border border-[#ffb4b4]/40 bg-[#5a3a3a] px-3 py-2 text-sm text-[#ffd5d5]"
                >
                  <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={cargando}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#d79c43] px-4 py-2.5 text-sm font-semibold text-[#2b2b2b] shadow-[0_4px_14px_-4px_rgba(215,156,67,0.7)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4e4e4e] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {cargando ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    Generando...
                  </>
                ) : (
                  <>
                    <FileText size={16} aria-hidden="true" />
                    Generar corte
                  </>
                )}
              </button>
            </form>

            {/* Acciones sobre el corte generado */}
            <div className="rounded-xl border border-[#d79c43]/30 bg-[#4e4e4e] p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#e3b462]">
                Acciones del corte
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                <AccionBoton
                  Icon={Save}
                  label="Respaldar corte"
                  disabled={!corteGenerado}
                  onClick={onRespaldar}
                />
                <AccionBoton
                  Icon={Printer}
                  label="Imprimir corte"
                  disabled={!corteGenerado}
                  onClick={onImprimir}
                />
                <AccionBoton
                  Icon={Trash2}
                  label="Borrar corte"
                  disabled={!corteGenerado}
                  onClick={() => setConfirmandoBorrado(true)}
                />
              </div>
              {!corteGenerado && (
                <p className="mt-2 text-xs text-gray-300">
                  Genera un corte para habilitar estas acciones.
                </p>
              )}

              {confirmandoBorrado && corteGenerado && (
                <div
                  role="alert"
                  className="mt-3 rounded-lg border border-[#ffb4b4]/40 bg-[#5a3a3a] p-3 text-sm text-[#ffd5d5]"
                >
                  <p>
                    ¿Borrar el corte {resumen.idCorte}? Esta acción no se puede deshacer.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onBorrar();
                        setConfirmandoBorrado(false);
                      }}
                      className="rounded-md bg-[#d79c43] px-3 py-1.5 text-xs font-semibold text-[#2b2b2b] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      Sí, borrar
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmandoBorrado(false)}
                      className="rounded-md border border-white/40 px-3 py-1.5 text-xs font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Resumen */}
            <div className="rounded-xl border border-[#d79c43]/30 bg-[#4e4e4e] p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#e3b462]">
                Resumen del corte
              </p>
              <dl className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                <Dato label="ID corte" valor={resumen?.idCorte ?? ""} />
                <Dato label="Retiros caja" valor={dinero(resumen?.retiros)} />
                <Dato label="Depósitos caja" valor={dinero(resumen?.depositos)} />
                <Dato label="Ventas" valor={dinero(resumen?.ventas)} />
                <Dato label="Subtotal" valor={dinero(resumen?.subtotal)} />
                <Dato label="Descuentos" valor={dinero(resumen?.descuentos)} />
                <Dato label="IVA" valor={dinero(resumen?.iva)} />
                <Dato label="Ganancias" valor={dinero(resumen?.ganancias)} />
                <Dato label="Total" valor={dinero(resumen?.total)} destacado />
              </dl>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

const CLASE_INPUT =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-[#2b2b2b] outline-none transition-colors focus:border-[#d79c43] focus:ring-2 focus:ring-[#d79c43]/40";

function AccionBoton({ Icon, label, disabled, onClick }) {
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

function Dato({ label, valor, destacado = false }) {
  return (
    <div className={destacado ? "col-span-2" : ""}>
      <dt className="mb-0.5 text-[11px] text-gray-200">{label}</dt>
      <dd
        className={[
          "min-h-[36px] rounded-md border border-gray-300 bg-white px-3 py-2 text-right text-sm text-[#2b2b2b]",
          destacado ? "font-bold" : "",
        ].join(" ")}
      >
        {valor}
      </dd>
    </div>
  );
}

function MensajeError({ id, texto }) {
  return (
    <p id={id} className="mt-1 flex items-center gap-1.5 text-xs text-[#ffb4b4]">
      <AlertCircle size={14} aria-hidden="true" />
      {texto}
    </p>
  );
}

// Gráfica de pastel con SVG puro (sin librerías). Cada rebanada se explica
// también en la leyenda con su nombre y porcentaje, para no depender solo del color.
function GraficoPastel({ datos }) {
  const total = datos.reduce((suma, d) => suma + d.cantidad, 0);

  if (total <= 0) {
    return (
      <p className="px-4 py-10 text-center text-sm text-gray-500">
        Genera un corte para ver la gráfica.
      </p>
    );
  }

  const rebanadas = datos.map((d, i) => ({
    ...d,
    pct: (d.cantidad / total) * 100,
    color: COLORES_PASTEL[i % COLORES_PASTEL.length],
  }));

  const cx = 100;
  const cy = 100;
  const r = 90;
  const punto = (grados) => {
    const rad = ((grados - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };

  let acumulado = 0;
  const trazos = rebanadas.map((s) => {
    const inicio = acumulado;
    acumulado += (s.pct / 100) * 360;
    const [x1, y1] = punto(inicio);
    const [x2, y2] = punto(acumulado);
    const grande = acumulado - inicio > 180 ? 1 : 0;
    return {
      ...s,
      d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${grande} 1 ${x2} ${y2} Z`,
    };
  });

  const resumenTexto = rebanadas
    .map((s) => `${s.nombre} ${Math.round(s.pct)}%`)
    .join(", ");

  return (
    <div className="flex flex-col items-center gap-4 p-4 sm:flex-row sm:justify-center sm:gap-8">
      <svg
        viewBox="0 0 200 200"
        role="img"
        aria-label={`Gráfica de pastel de productos más vendidos: ${resumenTexto}`}
        className="h-44 w-44 shrink-0"
      >
        {rebanadas.length === 1 ? (
          <circle cx={cx} cy={cy} r={r} fill={rebanadas[0].color} />
        ) : (
          trazos.map((t) => (
            <path key={t.nombre} d={t.d} fill={t.color} stroke="#ffffff" strokeWidth="1.5" />
          ))
        )}
      </svg>

      <ul className="space-y-1 text-sm text-[#2b2b2b]">
        {rebanadas.map((s) => (
          <li key={s.nombre} className="flex items-center gap-2">
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: s.color }}
              aria-hidden="true"
            />
            <span>
              {s.nombre} <span className="text-gray-600">[{Math.round(s.pct)}%]</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
