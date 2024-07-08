// to set the user credentials to local storage and remove (i.e., setcredentials and logout)

import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials: (state,action)=>{
            state.userInfo = action.payload; //here we are creating the userInfo
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        logout: (state, action)=>{
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
});

export const {setCredentials, logout} = authSlice.actions;
export default authSlice.reducer;