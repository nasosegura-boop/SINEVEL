import { useState } from "react";

const TITULOS = {
  anadir: "Añadir producto",
  modificar: "Modificar producto",
  entrada: "Dar entrada",
  salida: "Dar salida",
};

const VACIO = {
  producto: "", proveedor: "", cantidad_s1: 0,
  cantidad_s2: 0, precio: 0, codigo_barras: "",
};

export default function ModalProducto({ tipo, producto, onCerrar, onGuardar }) {
  const esStock = tipo === "entrada" || tipo === "salida";
  const [form, setForm] = useState(tipo === "modificar" ? { ...producto } : { ...VACIO });
  const [stock, setStock] = useState({ sucursal: "s1", cantidad: 1 });

  const cambiar = (e) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === "number" ? Number(value) : value });
  };

  const enviar = (e) => {
    e.preventDefault();
    onGuardar(esStock ? { ...stock, cantidad: Number(stock.cantidad) } : form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <form
        onSubmit={enviar}
        className="w-full max-w-md rounded-2xl border border-[#d79c43]/60 bg-[#454545] p-5 text-white shadow-2xl"
      >
        <h2 className="mb-1 text-lg font-semibold">{TITULOS[tipo]}</h2>
        {esStock && (
          <p className="mb-4 text-sm text-gray-300">{producto.producto}</p>
        )}

        {esStock ? (
          <div className="space-y-3">
            <Campo label="Sucursal">
              <select
                value={stock.sucursal}
                onChange={(e) => setStock({ ...stock, sucursal: e.target.value })}
                className="input"
              >
                <option value="s1">Sucursal 1 (actual: {producto.cantidad_s1})</option>
                <option value="s2">Sucursal 2 (actual: {producto.cantidad_s2})</option>
              </select>
            </Campo>
            <Campo label="Cantidad">
              <input
                type="number" min="1" required className="input"
                value={stock.cantidad}
                onChange={(e) => setStock({ ...stock, cantidad: e.target.value })}
              />
            </Campo>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Campo label="Producto" full>
              <input name="producto" value={form.producto} onChange={cambiar} required className="input text-black"/>
            </Campo>
            <Campo label="Código de barras">  
              <input name="codigo_barras" value={form.codigo_barras} onChange={cambiar} required className="input text-black" />
            </Campo>
            <Campo label="Proveedor">
              <input name="proveedor" value={form.proveedor} onChange={cambiar} className="input text-black"/>
            </Campo>
            <Campo label="Stock S1">
              <input name="cantidad_s1" type="number" min="0" value={form.cantidad_s1} onChange={cambiar} className="input text-black" />
            </Campo>
            <Campo label="Stock S2">
              <input name="cantidad_s2" type="number" min="0" value={form.cantidad_s2} onChange={cambiar} className="input text-black" />
            </Campo>
            <Campo label="Costo" full>
              <input name="precio" type="number" min="0" step="0.01" value={form.precio} onChange={cambiar} className="input text-black" />
            </Campo>
          </div>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onCerrar}
            className="rounded-lg bg-[#5a5a5a] px-4 py-2 text-sm hover:bg-[#6a6a6a]">
            Cancelar
          </button>
          <button type="submit"
            className="rounded-lg bg-[#d79c43] px-4 py-2 text-sm font-semibold text-[#2b2b2b]">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

function Campo({ label, children, full }) {
  return (
    <label className={`block ${full ? "col-span-2" : ""}`}>
      <span className="mb-1 block text-[11px] text-gray-200">{label}</span>
      {children}
    </label>
  );
}