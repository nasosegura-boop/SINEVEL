import { useState, useId } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  Clock,
  AlertCircle,
  Loader2,
  CalendarPlus,
} from "lucide-react";
import logoLyver from "../../assets/logo-lyver.png";

/**
 * AgendarCitaView — Vista (V de MVC) del módulo de Citas de S.I.N.E.V.E.L.
 *
 * Solo vista: no consulta ni guarda citas. Recibe los datos y los manejadores
 * desde el Controlador / página que la use.
 *
 * Props:
 * - mesLabel: texto del mes mostrado (por ejemplo, "Noviembre 2026")
 * - dias: Array<{ dia: number, disponible: boolean }>
 * - offset: casillas vacías antes del día 1 (0 = el mes empieza en lunes)
 * - diaSeleccionado, onSeleccionarDia(dia)
 * - onMesAnterior(), onMesSiguiente()
 * - horasDisponibles: Array<string> para el selector de hora
 * - citasProximas: Array<{ dia: string, hora: string }>
 * - onAgendar({ nombre, telefono, hora }): se llama con los datos ya completos
 * - error: mensaje del servidor; cargando: true mientras se guarda
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

const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

// Datos de ejemplo para ver la vista sin backend (como en el prototipo)
const NO_DISPONIBLES = [3, 18, 21, 24, 25];
const DIAS_EJEMPLO = Array.from({ length: 28 }, (_, i) => ({
  dia: i + 1,
  disponible: !NO_DISPONIBLES.includes(i + 1),
}));
const HORAS_EJEMPLO = ["10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "16:00 - 17:00"];
const CITAS_EJEMPLO = [
  { dia: "Lun 5", hora: "10:00 - 11:00" },
  { dia: "Mié 7", hora: "12:00 - 13:00" },
  { dia: "Vie 9", hora: "16:00 - 17:00" },
];

export default function AgendarCitaView({
  mesLabel = "Enero",
  dias = DIAS_EJEMPLO,
  offset = 0,
  diaSeleccionado = null,
  horasDisponibles = HORAS_EJEMPLO,
  citasProximas = CITAS_EJEMPLO,
  error = "",
  cargando = false,
  activeNav = "agendarCita",
  onNavegar = () => {},
  onSeleccionarDia = () => {},
  onMesAnterior = () => {},
  onMesSiguiente = () => {},
  onAgendar = () => {},
}) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [hora, setHora] = useState("");
  const [errores, setErrores] = useState({});

  const idNombre = useId();
  const idTelefono = useId();
  const idHora = useId();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de captura en la vista (prevención de errores).
    // Las reglas de negocio (disponibilidad real) las valida el backend.
    const nuevos = {};
    if (diaSeleccionado == null) nuevos.dia = "Selecciona un día disponible en el calendario.";
    if (!nombre.trim()) nuevos.nombre = "Escribe el nombre del cliente.";
    if (!/^\d{10}$/.test(telefono.trim())) nuevos.telefono = "Escribe un teléfono de 10 dígitos.";
    if (!hora) nuevos.hora = "Elige una hora.";
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    onAgendar({ nombre: nombre.trim(), telefono: telefono.trim(), hora });
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
            Agendar Cita
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
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[1.7fr_1fr]">
          {/* Calendario */}
          <section className="rounded-xl border border-[#d79c43]/30 bg-[#4e4e4e] p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CalendarDays size={22} className="text-[#e3b462]" aria-hidden="true" />
                <h2 className="text-2xl font-semibold">Citas</h2>
              </div>

              <ul className="flex items-center gap-4 text-sm text-gray-100">
                <li className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#3fae5a]" aria-hidden="true" />
                  Disponible
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#e05252]" aria-hidden="true" />
                  No disponible
                </li>
              </ul>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={onMesAnterior}
                  aria-label="Mes anterior"
                  className="rounded-md p-1.5 text-gray-100 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d79c43]"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="min-w-[110px] text-center text-lg font-semibold" aria-live="polite">
                  {mesLabel}
                </span>
                <button
                  type="button"
                  onClick={onMesSiguiente}
                  aria-label="Mes siguiente"
                  className="rounded-md p-1.5 text-gray-100 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d79c43]"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-medium text-[#e3b462]">
              {DIAS_SEMANA.map((d) => (
                <div key={d} className="py-1">
                  {d}
                </div>
              ))}
            </div>

            <div className="mt-1 grid grid-cols-7 gap-1.5">
              {Array.from({ length: offset }).map((_, i) => (
                <div key={`vacio-${i}`} aria-hidden="true" />
              ))}

              {dias.map(({ dia, disponible }) => {
                const seleccionado = dia === diaSeleccionado;
                return (
                  <button
                    key={dia}
                    type="button"
                    disabled={!disponible}
                    onClick={() => onSeleccionarDia(dia)}
                    aria-pressed={seleccionado}
                    aria-label={`${dia} de ${mesLabel}, ${disponible ? "disponible" : "no disponible"}`}
                    className={[
                      "relative flex min-h-[58px] items-start justify-between rounded-md border px-2 py-1.5 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d79c43] focus-visible:ring-offset-1 focus-visible:ring-offset-[#4e4e4e]",
                      seleccionado
                        ? "border-white bg-[#004aad] text-white shadow-md"
                        : disponible
                        ? "border-black/20 bg-[#5a5a5a]/70 text-white hover:-translate-y-0.5 hover:bg-[#6a6a6a]"
                        : "cursor-not-allowed border-black/20 bg-[#3d3d3d] text-gray-400 line-through",
                    ].join(" ")}
                  >
                    <span>{dia}</span>
                    <span
                      aria-hidden="true"
                      className={[
                        "mt-1 h-3 w-3 rounded-full",
                        disponible ? "bg-[#3fae5a]" : "bg-[#e05252]",
                      ].join(" ")}
                    />
                  </button>
                );
              })}
            </div>

            {errores.dia && <MensajeError texto={errores.dia} />}
          </section>

          {/* Panel derecho */}
          <section className="flex flex-col gap-4">
            {/* Citas próximas */}
            <div className="rounded-xl border border-black/20 bg-white shadow-inner">
              <div className="flex items-center gap-2 rounded-t-xl bg-[#004aad] px-4 py-2.5 text-white">
                <Clock size={16} aria-hidden="true" />
                <h2 className="text-sm font-semibold">Citas próximas</h2>
              </div>
              <table className="w-full text-left text-sm text-[#2b2b2b]">
                <thead className="bg-[#004aad]/10 text-[#003580]">
                  <tr>
                    <th className="px-4 py-1.5 font-medium">Día</th>
                    <th className="px-4 py-1.5 font-medium">Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {citasProximas.map((c, i) => (
                    <tr
                      key={`${c.dia}-${c.hora}-${i}`}
                      className="border-t border-gray-100 transition-colors hover:bg-[#fdf3e4]"
                    >
                      <td className="px-4 py-1.5">{c.dia}</td>
                      <td className="px-4 py-1.5">{c.hora}</td>
                    </tr>
                  ))}
                  {citasProximas.length === 0 && (
                    <tr>
                      <td colSpan={2} className="px-4 py-6 text-center text-gray-500">
                        No hay citas próximas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Formulario */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-3 rounded-xl border border-[#d79c43]/30 bg-[#4e4e4e] p-4"
            >
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#e3b462]">
                <CalendarPlus size={14} aria-hidden="true" /> Nueva cita
              </p>

              <Campo
                id={idNombre}
                label="Nombre"
                icono={<User size={16} aria-hidden="true" />}
                error={errores.nombre}
              >
                <input
                  id={idNombre}
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  autoComplete="off"
                  aria-invalid={errores.nombre ? "true" : "false"}
                  aria-describedby={errores.nombre ? `${idNombre}-error` : undefined}
                  placeholder="Nombre del cliente"
                  className={CLASE_INPUT}
                />
              </Campo>

              <Campo
                id={idTelefono}
                label="Teléfono"
                icono={<Phone size={16} aria-hidden="true" />}
                error={errores.telefono}
              >
                <input
                  id={idTelefono}
                  type="tel"
                  inputMode="numeric"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  autoComplete="off"
                  aria-invalid={errores.telefono ? "true" : "false"}
                  aria-describedby={errores.telefono ? `${idTelefono}-error` : undefined}
                  placeholder="10 dígitos"
                  className={CLASE_INPUT}
                />
              </Campo>

              <Campo
                id={idHora}
                label="Hora"
                icono={<Clock size={16} aria-hidden="true" />}
                error={errores.hora}
              >
                <select
                  id={idHora}
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  aria-invalid={errores.hora ? "true" : "false"}
                  aria-describedby={errores.hora ? `${idHora}-error` : undefined}
                  className={CLASE_INPUT}
                >
                  <option value="">Selecciona una hora</option>
                  {horasDisponibles.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </Campo>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-lg border border-[#ffb4b4]/40 bg-[#5a3a3a] px-3 py-2 text-sm text-[#ffd5d5]"
                >
                  <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={cargando}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d79c43] px-4 py-2.5 text-sm font-semibold text-[#2b2b2b] shadow-[0_4px_14px_-4px_rgba(215,156,67,0.7)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4e4e4e] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {cargando ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    Guardando...
                  </>
                ) : (
                  "Agendar"
                )}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

const CLASE_INPUT =
  "w-full rounded-md border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm text-[#2b2b2b] outline-none transition-colors placeholder:text-gray-500 focus:border-[#d79c43] focus:ring-2 focus:ring-[#d79c43]/40";

function Campo({ id, label, icono, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-100">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {icono}
        </span>
        {children}
      </div>
      {error && <MensajeError id={`${id}-error`} texto={error} />}
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
