import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query:()=>({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor:5,
        }),
        getProductDetails: builder.query({
            query: (productId)=>({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor:5,
        }),
        createProduct: builder.mutation({
            query:() =>({
                url: PRODUCTS_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Product'],//An endpoint definition that alters data on the server or will possibly invalidate the cache.
        })
    }),
});

export const {useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation} = productApiSlice;