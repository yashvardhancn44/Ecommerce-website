import {USERS_URL} from '../constants';
import { apiSlice } from './apiSlice';

// this is for the server and whatever is done in authSlice is for local stuffs - read on this once again. 


//endpoint injections using mutations. 
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({

        login: builder.mutation({
            query:(data) =>({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),

        register: builder.mutation({
            query:(data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            })
        }),

        logout: builder.mutation({
            query: ()=>({
                url: `${USERS_URL}/logout`,
                method: 'POST', 
            })
        }),

        profile: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        })
    }),
});

export const { useLoginMutation, useLogoutMutation , useRegisterMutation, useProfileMutation} = usersApiSlice;


