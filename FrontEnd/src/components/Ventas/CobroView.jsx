import { useState, useId } from "react";
import {
  Banknote,
  CreditCard,
  Printer,
  Receipt,
  FileText,
  BadgePercent,
  ArrowLeft,
  AlertCircle,
  Loader2,
} from "lucide-react";
import logoLyver from "../../assets/logo-lyver.png";

/**
 * CobroView — Vista (V de MVC) de la pantalla "Cobrando" de S.I.N.E.V.E.L. (CU2.5 y CU3).
 *
 * Solo vista: no registra el pago ni imprime. Recibe el total y los manejadores
 * desde el Controlador / página que la use.
 *
 * Props:
 * - total: total a cobrar de la venta (con descuentos ya aplicados)
 * - descuento: descuento aplicado (si hay), solo para mostrarlo
 * - onCobrar({ metodo, pagoCon, referencia, imprimir }): se llama con el pago ya validado
 *       metodo: "efectivo" | "tarjeta"; imprimir: true | false
 * - onAplicarDescuento(), onGenerarFactura(), onVolver()
 * - error: mensaje del servidor; cargando: true mientras se registra el cobro
 *
 * El cambio que se muestra es solo informativo: el backend debe recalcularlo.
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

const moneda = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
const dinero = (v) => moneda.format(v ?? 0);

export default function CobroView({
  total = 1234.56,
  descuento = 0,
  error = "",
  cargando = false,
  activeNav = "",
  onNavegar = () => {},
  onCobrar = () => {},
  onAplicarDescuento = () => {},
  onGenerarFactura = () => {},
  onVolver = () => {},
}) {
  const [metodo, setMetodo] = useState("efectivo");
  const [pagoCon, setPagoCon] = useState("");
  const [referencia, setReferencia] = useState("");
  const [errores, setErrores] = useState({});

  const idPago = useId();
  const idReferencia = useId();

  const esEfectivo = metodo === "efectivo";
  const pago = Number(pagoCon);
  const hayPago = esEfectivo && pagoCon !== "" && !Number.isNaN(pago);
  const cambio = hayPago ? pago - total : null;

  const validar = () => {
    const nuevos = {};
    if (esEfectivo) {
      if (pagoCon === "" || Number.isNaN(pago)) nuevos.pago = "Escribe con cuánto paga el cliente.";
      else if (pago < total) nuevos.pago = "El pago no cubre el total de la venta.";
    } else if (!referencia.trim()) {
      nuevos.referencia = "Escribe la referencia del pago con tarjeta.";
    }
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const cobrar = (imprimir) => {
    if (!validar()) return;
    onCobrar({
      metodo,
      pagoCon: esEfectivo ? pago : total,
      referencia: referencia.trim(),
      imprimir,
    });
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
            Cobrando
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
        <div className="p-4">
          <section className="rounded-xl border border-[#d79c43]/30 bg-[#4e4e4e] p-5">
            <button
              type="button"
              onClick={onVolver}
              className="mb-4 flex items-center gap-1.5 rounded-md text-sm text-gray-200 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d79c43]"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Volver a la venta
            </button>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Datos del pago */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  cobrar(true);
                }}
                noValidate
                className="space-y-4"
              >
                <div>
                  <p className="text-sm text-gray-200">Total a cobrar</p>
                  <p className="text-4xl font-bold text-[#e3b462]">{dinero(total)}</p>
                  {descuento > 0 && (
                    <p className="mt-1 text-sm text-gray-200">
                      Incluye un descuento de {dinero(descuento)}
                    </p>
                  )}
                </div>

                <fieldset>
                  <legend className="mb-1 text-sm font-medium text-gray-100">Método de pago</legend>
                  <div className="grid grid-cols-2 gap-2.5">
                    <OpcionPago
                      valor="efectivo"
                      etiqueta="Efectivo"
                      Icon={Banknote}
                      actual={metodo}
                      onChange={(v) => {
                        setMetodo(v);
                        setErrores({});
                      }}
                    />
                    <OpcionPago
                      valor="tarjeta"
                      etiqueta="Tarjeta"
                      Icon={CreditCard}
                      actual={metodo}
                      onChange={(v) => {
                        setMetodo(v);
                        setErrores({});
                      }}
                    />
                  </div>
                </fieldset>

                {esEfectivo && (
                  <>
                    <div>
                      <label htmlFor={idPago} className="mb-1 block text-lg font-semibold">
                        Pago con:
                      </label>
                      <input
                        id={idPago}
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="0.01"
                        value={pagoCon}
                        onChange={(e) => setPagoCon(e.target.value)}
                        aria-invalid={errores.pago ? "true" : "false"}
                        aria-describedby={errores.pago ? `${idPago}-error` : undefined}
                        placeholder="0.00"
                        className={CLASE_INPUT}
                      />
                      {errores.pago && <MensajeError id={`${idPago}-error`} texto={errores.pago} />}
                    </div>

                    <div aria-live="polite">
                      <p className="text-lg font-semibold">Cambio:</p>
                      <p
                        className={[
                          "mt-1 min-h-[44px] rounded-md border border-gray-300 bg-white px-3 py-2 text-xl font-bold",
                          cambio != null && cambio >= 0 ? "text-[#1c6b34]" : "text-[#2b2b2b]",
                        ].join(" ")}
                      >
                        {cambio != null && cambio >= 0 ? dinero(cambio) : ""}
                      </p>
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor={idReferencia} className="mb-1 block text-lg font-semibold">
                    Referencia{esEfectivo ? " (opcional)" : ""}
                  </label>
                  <input
                    id={idReferencia}
                    type="text"
                    value={referencia}
                    onChange={(e) => setReferencia(e.target.value)}
                    autoComplete="off"
                    aria-invalid={errores.referencia ? "true" : "false"}
                    aria-describedby={errores.referencia ? `${idReferencia}-error` : undefined}
                    placeholder={esEfectivo ? "Número de referencia" : "Número de autorización"}
                    className={CLASE_INPUT}
                  />
                  {errores.referencia && (
                    <MensajeError id={`${idReferencia}-error`} texto={errores.referencia} />
                  )}
                </div>

                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-lg border border-[#ffb4b4]/40 bg-[#5a3a3a] px-3 py-2 text-sm text-[#ffd5d5]"
                  >
                    <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </form>

              {/* Mensaje y acciones */}
              <div className="flex flex-col justify-between gap-6">
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <p className="text-2xl font-bold sm:text-3xl">Que tenga una linda tarde</p>
                  <p className="mt-2 text-3xl" aria-hidden="true">
                    :)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    disabled={cargando}
                    onClick={() => cobrar(true)}
                    className="col-span-2 flex items-center justify-center gap-2 rounded-lg bg-[#d79c43] px-4 py-3 text-sm font-semibold text-[#2b2b2b] shadow-[0_4px_14px_-4px_rgba(215,156,67,0.7)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4e4e4e] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {cargando ? (
                      <>
                        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                        Cobrando...
                      </>
                    ) : (
                      <>
                        <Printer size={16} aria-hidden="true" />
                        Imprimir ticket
                      </>
                    )}
                  </button>
                  <AccionBoton
                    Icon={Receipt}
                    label="Cobrar sin imprimir"
                    disabled={cargando}
                    onClick={() => cobrar(false)}
                  />
                  <AccionBoton
                    Icon={FileText}
                    label="Generar factura"
                    disabled={cargando}
                    onClick={onGenerarFactura}
                  />
                  <AccionBoton
                    Icon={BadgePercent}
                    label="Aplicar descuento"
                    disabled={cargando}
                    onClick={onAplicarDescuento}
                    className="col-span-2"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

const CLASE_INPUT =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-base text-[#2b2b2b] outline-none transition-colors placeholder:text-gray-500 focus:border-[#d79c43] focus:ring-2 focus:ring-[#d79c43]/40";

function OpcionPago({ valor, etiqueta, Icon, actual, onChange }) {
  const seleccionado = actual === valor;
  return (
    <label
      className={[
        "flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors focus-within:ring-2 focus-within:ring-[#d79c43]",
        seleccionado
          ? "border-[#d79c43] bg-[#d79c43] text-[#2b2b2b]"
          : "border-white/30 bg-[#5a5a5a]/70 text-white hover:bg-[#6a6a6a]",
      ].join(" ")}
    >
      <input
        type="radio"
        name="metodo-pago"
        value={valor}
        checked={seleccionado}
        onChange={() => onChange(valor)}
        className="sr-only"
      />
      <Icon size={18} aria-hidden="true" />
      {etiqueta}
    </label>
  );
}

function AccionBoton({ Icon, label, disabled = false, onClick, className = "" }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "flex flex-col items-center gap-1.5 rounded-lg border border-black/10 bg-[#ae864e] px-2 py-3 text-center text-[11.5px] font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#bf9459] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d79c43] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-[#ae864e]",
        className,
      ].join(" ")}
    >
      <Icon size={18} strokeWidth={2} aria-hidden="true" />
      {label}
    </button>
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
