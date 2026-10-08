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
            query: (body) => ({
                url: "/Productos", method: "POST", body
            }),
            invalidatesTags: ["Productos"],
        }),
        updateProducto: builder.mutation ({
            query: (producto) => ({
                url: `/productos/${producto.id_producto}`,
                method: "PUT",
                body: producto,
            }),
            invalidatesTags: ["Productos"],
        }),
        deleteProducto: builder.mutation({
            query: (id) => ({
                url: `/productos/${id}`,
                method: "DELETE",

            }),
            invalidatesTags: ["Productos"],
        })
    })
});

export const {
    useGetProductosQuery,
    useGetProductoByCodigoQuery,
    useLazyGetProductoByCodigoQuery,
    useAddProductoMutation,
    useUpdateProductoMutation,
    useDeleteProductoMutation,
} = api;