import { useMemo, useState } from "react";
import InventarioView from "./InventarioView"; 
import ModalProducto from "../modalProducto";
import {
  useGetProductosQuery,
  useAddProductoMutation,
  useUpdateProductoMutation,
  useDeleteProductoMutation,
} from "../../utils/api"; 

export default function InventarioPage() {
  const { data = [], isLoading, error } = useGetProductosQuery();
  const [addProducto] = useAddProductoMutation();
  const [updateProducto] = useUpdateProductoMutation();
  const [deleteProducto] = useDeleteProductoMutation();

  const [filtro, setFiltro] = useState({ codigo: "", nombre: "" });
  const [seleccionadoId, setSeleccionadoId] = useState(null);
  const [modal, setModal] = useState(null); 

  const seleccionado = data.find((p) => p.id_producto === seleccionadoId);

  const productosVista = useMemo(() => {
    const c = filtro.codigo.toLowerCase();
    const n = filtro.nombre.toLowerCase();
    return data
      .filter(
        (p) =>
          p.codigo_barras.toLowerCase().includes(c) &&
          p.producto.toLowerCase().includes(n)
      )
      .map((p) => ({
        id: p.id_producto,
        codigo: p.codigo_barras,
        nombre: p.producto,
        stockS1: p.cantidad_s1,
        stockS2: p.cantidad_s2,
        costo: p.precio,
      }));
  }, [data, filtro]);

  const handleAccion = async (accion) => {
    console.log("accion:", accion, "seleccionado:", seleccionado);
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
        // entrada / salida
        const campo = datos.sucursal === "s1" ? "cantidad_s1" : "cantidad_s2";
        const delta = modal === "entrada" ? datos.cantidad : -datos.cantidad;
        const nuevoStock = seleccionado[campo] + delta;
        if (nuevoStock < 0) {
          alert("No hay stock suficiente en esa sucursal");
          return;
        }
        await updateProducto({ ...seleccionado, [campo]: nuevoStock }).unwrap();
      }
      setModal(null);
    } catch {
      
      alert("No se pudo guardar. Revisa los datos e intenta de nuevo.");
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