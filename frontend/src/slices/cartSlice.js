//using createSlice here as opposed to the createApi used in apiSlice as we dont have to use async functionality here. 
//using creatSlice here unlike CreateApiSlice ---> createApiSlice have some changes in how we export and all
import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";


const initialState = localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):{cartItems: [], shippingAddress:{}, paymentMethod: 'PayPal'};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action)=>{
            const item = action.payload;

            const existItem = state.cartItems.find((x)=> x._id === item._id);

            if(existItem){
                    state.cartItems = state.cartItems.map((x)=> 
                        x._id === existItem._id? item : x );
            } else{
                state.cartItems = [...state.cartItems, item];
            }
            
            return updateCart(state);
        },
        removeFromCart: (state, action)=>{
            state.cartItems= state.cartItems.filter((x)=> x._id !== action.payload);
            // we are returning all the items which we are not deleting. 

            return updateCart(state);
        },
        saveShippingAddress: (state, action)=>{
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        savePaymentMethod: (state, action)=>{
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        
        //@desc: to clear the cart items once the order is placed. 
        clearCartItems: (state, action) =>{
            state.cartItems = [];
            return updateCart(state);
        }
    },
});

export const {addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems} = cartSlice.actions;

export default cartSlice.reducer;
