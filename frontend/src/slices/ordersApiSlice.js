import {apiSlice} from './apiSlice';
import { ORDERS_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        createOrder: builder.mutation({
            query: (order)=>({
                url: ORDERS_URL, // the URL this mutation will hit
                method: 'POST',
                body: {...order}
            })
        })
    })
});

export const { useCreateOrderMutation } = ordersApiSlice;