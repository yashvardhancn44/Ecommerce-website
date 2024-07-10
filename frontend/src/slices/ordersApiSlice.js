import {apiSlice} from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        createOrder: builder.mutation({
            query: (order)=>({
                url: ORDERS_URL, // the URL this mutation will hit
                method: 'POST',
                body: {...order}
            })
        }),
        getOrderDetails: builder.query({
            query: (orderId)=>({
                url: `${ORDERS_URL}/${orderId}`
            }),
            keepUnusedDataFor: 5
        }),
        payOrder: builder.mutation({
            query: ({orderId, details})=>({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: {...details},
            })
        }),
        getPayPalClientId: builder.query({
            query: ()=>({
                url: `${PAYPAL_URL}`,
            }),
            keepUnusedDataFor: 5, 
        }),
        getMyOrders: builder.query({
            query:()=>({
               url: `${ORDERS_URL}/mine` // to getMyOrder (from order controller)
            }),
            keepUnusedDataFor: 5,
        }),
        getOrders: builder.query({
            query: ()=>({
                url: ORDERS_URL,
            }),
            keepUnusedDataFor: 5
        }),
        deliverOrder: builder.mutation({
            query:(orderId)=>({
                url:`${ORDERS_URL}/${orderId}/deliver`,
                method:'PUT'
            })
        })
    })
});

export const { 
    useCreateOrderMutation, 
    useGetOrderDetailsQuery, 
    usePayOrderMutation, 
    useGetPayPalClientIdQuery,
    useGetMyOrdersQuery,
    useGetOrdersQuery,
    useDeliverOrderMutation } = ordersApiSlice;