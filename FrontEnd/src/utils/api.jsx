import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5134/api" }),
    tagTypes: ["Productos"],
    endpoints: (builder) => ({
        getProductos: builder.query({
            query: () => "/Productos",
            providesTags: ["Productos"],
        }),
        addProducto: builder.mutation({
            query: (body) => ({ url: "/Productos", method: "POST", body }),
            invalidatesTags: ["Productos"],
        }),
        updateProducto: builder.mutation({
            query: (producto) => ({
                url: `/Productos/${producto.id_producto}`,
                method: "PUT",
                body: producto,
            }),
            invalidatesTags: ["Productos"],
        }),
        deleteProducto: builder.mutation({
            query: (id) => ({ url: `/Productos/${id}`, method: "DELETE" }),
            invalidatesTags: ["Productos"],
        }),
        entradaProducto: builder.mutation({
            query: ({ id, sucursal, cantidad }) => ({
                url: `/Productos/${id}/entrada`,
                method: "POST",
                body: { sucursal, cantidad },
            }),
            invalidatesTags: ["Productos"],
        }),
        salidaProducto: builder.mutation({
            query: ({ id, sucursal, cantidad }) => ({
                url: `/Productos/${id}/salida`,
                method: "POST",
                body: { sucursal, cantidad },
            }),
            invalidatesTags: ["Productos"],
        }),
    }),
});

export const {
    useGetProductosQuery,
    useAddProductoMutation,
    useUpdateProductoMutation,
    useDeleteProductoMutation,
    useEntradaProductoMutation,
    useSalidaProductoMutation,
} = api;
