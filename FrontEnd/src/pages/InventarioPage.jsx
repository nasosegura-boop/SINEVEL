import { useMemo, useState } from "react";
import InventarioView from "../components/Inventario/InventarioView";
import ModalProducto from "../components/modalProducto";
import {
  useGetProductosQuery,
  useAddProductoMutation,
  useUpdateProductoMutation,
  useDeleteProductoMutation,
  useEntradaProductoMutation,
  useSalidaProductoMutation,
} from "../utils/api";

export default function InventarioPage() {
  const { data = [], isLoading, error } = useGetProductosQuery();
  const [addProducto] = useAddProductoMutation();
  const [updateProducto] = useUpdateProductoMutation();
  const [deleteProducto] = useDeleteProductoMutation();
  const [entradaProducto] = useEntradaProductoMutation();
  const [salidaProducto] = useSalidaProductoMutation();

  const [filtro, setFiltro] = useState({ codigo: "", nombre: "" });
  const [seleccionadoId, setSeleccionadoId] = useState(null);
  const [modal, setModal] = useState(null);

  const seleccionado = data.find((p) => p.id_producto === seleccionadoId);

  // Filtrado reactivo en tiempo real con protección contra nulos
  const productosVista = useMemo(() => {
    const c = (filtro.codigo || "").toLowerCase().trim();
    const n = (filtro.nombre || "").toLowerCase().trim();

    return data
      .filter((p) => {
        const codigoProd = (p.codigo_barras || "").toString().toLowerCase();
        const nombreProd = (p.producto || "").toString().toLowerCase();

        const coincideCodigo = c !== "" && codigoProd.includes(c);
        const coincideNombre = n !== "" && nombreProd.includes(n);

        if (c && n) return coincideCodigo && coincideNombre;
        if (c) return coincideCodigo;
        if (n) return coincideNombre;
        return true;
      })
      .map((p) => ({
        id: p.id_producto,
        codigo: p.codigo_barras,
        nombre: p.producto,
        proveedor: p.proveedor,
        stockS1: p.cantidad_s1,
        stockS2: p.cantidad_s2,
        costo: p.precio,
      }));
  }, [data, filtro]);

  const handleAccion = async (accion) => {
    if (accion === "anadir") return setModal("anadir");

    if (!seleccionado) {
      alert("Primero selecciona un producto de la tabla");
      return;
    }

    if (accion === "eliminar") {
      if (!confirm(`¿Eliminar "${seleccionado.producto}"?`)) return;
      try {
        await deleteProducto(seleccionado.id_producto).unwrap();
        setSeleccionadoId(null);
      } catch {
        alert("No se pudo eliminar el producto");
      }
      return;
    }

    setModal(accion);
  };

  const handleGuardar = async (datos) => {
    try {
      if (modal === "anadir") {
        const { id_producto, ...nuevo } = datos;
        await addProducto(nuevo).unwrap();
      } else if (modal === "modificar") {
        await updateProducto({ ...seleccionado, ...datos }).unwrap();
      } else {
        const args = {
          id: seleccionado.id_producto,
          sucursal: datos.sucursal === "s1" ? 1 : 2,
          cantidad: datos.cantidad,
        };
        if (modal === "entrada") await entradaProducto(args).unwrap();
        else await salidaProducto(args).unwrap();
      }
      setModal(null);
    } catch (e) {
      const msg = typeof e?.data === "string" ? e.data : null;
      alert(msg ?? "No se pudo guardar. Revisa los datos e intenta de nuevo.");
    }
  };

  return (
    <>
      <InventarioView
        productos={productosVista}
        cargando={isLoading}
        error={!!error}
        seleccionadoId={seleccionadoId}
        nombreSeleccionado={seleccionado?.producto}
        onSeleccionar={setSeleccionadoId}
        onAccion={handleAccion}
        onBuscar={(codigo, nombre) => setFiltro({ codigo, nombre })}
      />
      {modal && (
        <ModalProducto
          tipo={modal}
          producto={seleccionado}
          onCerrar={() => setModal(null)}
          onGuardar={handleGuardar}
        />
      )}
    </>
  );
}