import { useState, useId } from "react";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  LogIn,
} from "lucide-react";
import logoLyver from "../../assets/logo-lyver.png";

export default function LoginView({
  onLogin = () => {},
  error = "",
  cargando = false,
}) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [verContrasena, setVerContrasena] = useState(false);
  const [errores, setErrores] = useState({});

  const idUsuario = useId();
  const idContrasena = useId();

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevos = {};
    if (!usuario.trim()) nuevos.usuario = "Escribe tu usuario.";
    if (!contrasena) nuevos.contrasena = "Escribe tu contraseña.";
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    onLogin(usuario.trim(), contrasena);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#3a3a3a] p-3 font-sans text-white sm:p-6">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#d79c43]/60 bg-[#454545] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
        {/* Encabezado */}
        <header className="relative flex flex-col items-center gap-2 overflow-hidden bg-gradient-to-r from-[#3d3d3d] via-[#545454] to-[#3d3d3d] px-6 py-6">
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-[#d79c43] to-transparent" />
          <img
            src={logoLyver}
            alt="Lyver — Distribuidora y Salón de Belleza"
            className="h-30 w-auto object-contain"
          />
          <p className="text-lg font-extrabold tracking-wide text-white">
            SINEVEL
          </p>
          <p className="text-center text-[11px] leading-snug text-gray-300">
            Sistema de inventariado y ventas electrónico
            <br />
            de productos y servicios de belleza
          </p>
        </header>

   
        <form onSubmit={handleSubmit} noValidate className="space-y-4 p-6">
          <h1 className="text-center text-xl font-semibold tracking-tight">
            Iniciar sesión
          </h1>

      
          <div>
            <label
              htmlFor={idUsuario}
              className="mb-1 block text-sm font-medium text-gray-100"
            >
              Usuario
            </label>
            <div className="relative">
              <User
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                id={idUsuario}
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                autoComplete="username"
                autoFocus
                aria-invalid={errores.usuario ? "true" : "false"}
                aria-describedby={errores.usuario ? `${idUsuario}-error` : undefined}
                placeholder="Tu nombre de usuario"
                className="w-full rounded-md border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm text-[#2b2b2b] outline-none transition-colors placeholder:text-gray-500 focus:border-[#d79c43] focus:ring-2 focus:ring-[#d79c43]/40"
              />
            </div>
            {errores.usuario && (
              <p
                id={`${idUsuario}-error`}
                className="mt-1 flex items-center gap-1.5 text-xs text-[#ffb4b4]"
              >
                <AlertCircle size={14} aria-hidden="true" />
                {errores.usuario}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label
              htmlFor={idContrasena}
              className="mb-1 block text-sm font-medium text-gray-100"
            >
              Contraseña
            </label>
            <div className="relative">
              <Lock
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                id={idContrasena}
                type={verContrasena ? "text" : "password"}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                autoComplete="current-password"
                aria-invalid={errores.contrasena ? "true" : "false"}
                aria-describedby={
                  errores.contrasena ? `${idContrasena}-error` : undefined
                }
                placeholder="Tu contraseña"
                className="w-full rounded-md border border-gray-300 bg-white py-2.5 pl-9 pr-11 text-sm text-[#2b2b2b] outline-none transition-colors placeholder:text-gray-500 focus:border-[#d79c43] focus:ring-2 focus:ring-[#d79c43]/40"
              />
              <button
                type="button"
                onClick={() => setVerContrasena((v) => !v)}
                aria-label={verContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
                aria-pressed={verContrasena}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-1.5 text-gray-600 transition-colors hover:text-[#2b2b2b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d79c43]"
              >
                {verContrasena ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errores.contrasena && (
              <p
                id={`${idContrasena}-error`}
                className="mt-1 flex items-center gap-1.5 text-xs text-[#ffb4b4]"
              >
                <AlertCircle size={14} aria-hidden="true" />
                {errores.contrasena}
              </p>
            )}
          </div>

          {/* Error del servidor */}
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-[#ffb4b4]/40 bg-[#5a3a3a] px-3 py-2 text-sm text-[#ffd5d5]"
            >
              <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={cargando}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d79c43] px-4 py-2.5 text-sm font-semibold text-[#2b2b2b] shadow-[0_4px_14px_-4px_rgba(215,156,67,0.7)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#454545] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {cargando ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                Verificando...
              </>
            ) : (
              <>
                <LogIn size={16} aria-hidden="true" />
                Iniciar sesión
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-gray-300">
            Acceso solo para personal autorizado de LYVER.
          </p>
        </form>
      </div>
    </div>
  );
}
