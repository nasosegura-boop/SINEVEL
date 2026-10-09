

const BASE_URL = "http://localhost:5000/api/inventario"; 

export async function obtenerProductos() {

  return []; 
}

export async function buscarProducto(codigo, nombre) {

  console.log("Buscando:", { codigo, nombre });
}

export async function darEntrada(codigo, cantidad) {
  console.log("Dar entrada:", { codigo, cantidad });
}

export async function darSalida(codigo, cantidad) {
  console.log("Dar salida:", { codigo, cantidad });
}


