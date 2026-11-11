import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";

export default function ModalProducto({
  tipo = "anadir", // 'anadir' | 'modificar' | 'entrada' | 'salida'
  producto = null,
  onCerrar = () => {},
  onGuardar = () => {},
}) {
  const [formData, setFormData] = useState({
    codigo_barras: "",
    producto: "",
    proveedor: "",
    precio: "",
    cantidad_s1: "",
    cantidad_s2: "",
    sucursal: "s1",
    cantidad: 1,
  });

  const [errorValidacion, setErrorValidacion] = useState("");

  useEffect(() => {
    if (producto && (tipo === "modificar" || tipo === "entrada" || tipo === "salida")) {
      setFormData((prev) => ({
        ...prev,
        codigo_barras: producto.codigo || producto.codigo_barras || "",
        producto: producto.nombre || producto.producto || "",
        proveedor: producto.proveedor || "",
        precio: producto.costo ?? producto.precio ?? "",
        cantidad_s1: producto.stockS1 ?? producto.cantidad_s1 ?? "",
        cantidad_s2: producto.stockS2 ?? producto.cantidad_s2 ?? "",
      }));
    }
  }, [producto, tipo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorValidacion(""); // Limpiar aviso previo

    // --- VALIDACIONES EN ESPAÑOL ---
    if (tipo === "anadir" || tipo === "modificar") {
      if (!formData.codigo_barras.toString().trim()) {
        setErrorValidacion("Aviso: Por favor, ingresa el código de barras.");
        return;
      }

      if (!formData.producto.trim()) {
        setErrorValidacion("Aviso: El nombre del producto es obligatorio.");
        return;
      }

      if (
        formData.precio === "" ||
        isNaN(formData.precio) ||
        Number(formData.precio) <= 0
      ) {
        setErrorValidacion("Aviso: Ingresa un precio válido mayor a $0.00.");
        return;
      }
    }

    if (tipo === "entrada" || tipo === "salida") {
      const cantidad = Number(formData.cantidad);

      if (formData.cantidad === "" || isNaN(cantidad) || cantidad <= 0) {
        setErrorValidacion("Aviso: Ingresa una cantidad válida mayor a 0.");
        return;
      }

      // Validar si intenta retirar más de lo que hay en existencia
      if (tipo === "salida") {
        const stockDisponible =
          formData.sucursal === "s1"
            ? Number(formData.cantidad_s1) || 0
            : Number(formData.cantidad_s2) || 0;

        if (cantidad > stockDisponible) {
          setErrorValidacion(
            `Aviso: Intentas retirar ${cantidad} piezas, pero solo hay ${stockDisponible} disponible(s) en la sucursal seleccionada.`
          );
          return;
        }
      }
    }

    // --- SI TODO ES VÁLIDO, GUARDAMOS ---
    onGuardar({
      ...formData,
      precio: parseFloat(formData.precio) || 0,
      cantidad_s1: parseInt(formData.cantidad_s1) || 0,
      cantidad_s2: parseInt(formData.cantidad_s2) || 0,
      cantidad: parseInt(formData.cantidad) || 1,
    });
  };

  const handleSelectOnFocus = (e) => e.target.select();

  const titulos = {
    anadir: "Añadir Nuevo Producto",
    modificar: "Modificar Producto",
    entrada: "Dar Entrada a Stock",
    salida: "Dar Salida de Stock",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#d79c43]/40 bg-white text-gray-900 shadow-2xl">
        {/* Header del Modal */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#3d3d3d] to-[#545454] px-6 py-4 text-white">
          <h2 className="text-lg font-bold tracking-wide text-white">
            {titulos[tipo] || "Producto"}
          </h2>
          <button
            type="button"
            onClick={onCerrar}
            className="rounded-lg p-1 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mensaje de Aviso / Error de Validación */}
        {errorValidacion && (
          <div className="mx-6 mt-4 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs font-semibold text-amber-900 shadow-sm">
            <AlertCircle size={18} className="shrink-0 text-amber-600" />
            <span>{errorValidacion}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
          {tipo === "anadir" || tipo === "modificar" ? (
            <>
              <div>
                <label className="mb-1 block text-xs font-bold text-gray-700 uppercase">
                  Código de Barras
                </label>
                <input
                  type="text"
                  value={formData.codigo_barras}
                  onChange={(e) => {
                    setErrorValidacion("");
                    setFormData({ ...formData, codigo_barras: e.target.value });
                  }}
                  placeholder="Ej. MS1234"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[#d79c43] focus:ring-2 focus:ring-[#d79c43]/30"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-gray-700 uppercase">
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  value={formData.producto}
                  onChange={(e) => {
                    setErrorValidacion("");
                    setFormData({ ...formData, producto: e.target.value });
                  }}
                  placeholder="Ej. Tinte Anven 7.1"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[#d79c43] focus:ring-2 focus:ring-[#d79c43]/30"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-gray-700 uppercase">
                  Proveedor
                </label>
                <input
                  type="text"
                  value={formData.proveedor}
                  onChange={(e) =>
                    setFormData({ ...formData, proveedor: e.target.value })
                  }
                  placeholder="Ej. L'Oréal / Anven / Distribuidora X"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[#d79c43] focus:ring-2 focus:ring-[#d79c43]/30"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-gray-700 uppercase">
                  Precio / Costo ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.precio}
                  onFocus={handleSelectOnFocus}
                  onChange={(e) => {
                    setErrorValidacion("");
                    setFormData({ ...formData, precio: e.target.value });
                  }}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[#d79c43] focus:ring-2 focus:ring-[#d79c43]/30"
                />
              </div>

              {tipo === "anadir" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-gray-700 uppercase">
                      Stock inicial S1
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.cantidad_s1}
                      onFocus={handleSelectOnFocus}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cantidad_s1: e.target.value,
                        })
                      }
                      placeholder="0"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 outline-none transition-all focus:border-[#d79c43] focus:ring-2 focus:ring-[#d79c43]/30"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-gray-700 uppercase">
                      Stock inicial S2
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.cantidad_s2}
                      onFocus={handleSelectOnFocus}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cantidad_s2: e.target.value,
                        })
                      }
                      placeholder="0"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 outline-none transition-all focus:border-[#d79c43] focus:ring-2 focus:ring-[#d79c43]/30"
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Para ENTRADA y SALIDA */}
              <div className="rounded-lg bg-gray-50 p-3.5 border border-gray-200 space-y-1">
                <p className="text-xs font-medium text-gray-500 uppercase">
                  Producto seleccionado:
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {formData.producto || "Sin nombre"}
                </p>
                <div className="flex justify-between text-xs text-gray-600 font-mono">
                  <span>Código: {formData.codigo_barras}</span>
                  {formData.proveedor && <span>Proveedor: {formData.proveedor}</span>}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-gray-700 uppercase">
                  Sucursal
                </label>
                <select
                  value={formData.sucursal}
                  onChange={(e) => {
                    setErrorValidacion("");
                    setFormData({ ...formData, sucursal: e.target.value });
                  }}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 outline-none transition-all focus:border-[#d79c43] focus:ring-2 focus:ring-[#d79c43]/30"
                >
                  <option value="s1" className="text-gray-900 bg-white">
                    Sucursal 1 (Stock actual: {formData.cantidad_s1 || 0})
                  </option>
                  <option value="s2" className="text-gray-900 bg-white">
                    Sucursal 2 (Stock actual: {formData.cantidad_s2 || 0})
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-gray-700 uppercase">
                  Cantidad a {tipo === "entrada" ? "ingresar" : "retirar"}
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.cantidad}
                  onFocus={handleSelectOnFocus}
                  onChange={(e) => {
                    setErrorValidacion("");
                    setFormData({
                      ...formData,
                      cantidad: e.target.value,
                    });
                  }}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[#d79c43] focus:ring-2 focus:ring-[#d79c43]/30"
                />
              </div>
            </>
          )}

          {/* Botones de Acción */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onCerrar}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#d79c43] px-5 py-2 text-sm font-bold text-[#2b2b2b] shadow-md transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}