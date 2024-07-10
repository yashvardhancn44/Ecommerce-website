import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query:()=>({
                url: PRODUCTS_URL,
            }),
            providesTags: ['Products'] ,//avoids us from doing refersh again
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
        }),
        updateProduct: builder.mutation({
            query: (data)=>({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Products'],
        })
    }),
});

export const {
    useGetProductsQuery, 
    useGetProductDetailsQuery, 
    useCreateProductMutation, 
    useUpdateProductMutation} = productApiSlice;