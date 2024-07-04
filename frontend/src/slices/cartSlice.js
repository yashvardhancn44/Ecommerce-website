//using createSlice here as opposed to the createApi used in apiSlice as we dont have to use async functionality here. 

import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):{cartItems: []};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {}
});

export default cartSlice.reducer;
