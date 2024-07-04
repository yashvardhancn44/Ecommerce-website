// Entry point of Redux

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./src/slices/apiSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,  
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.reducer),
    devTools: true
});

export default store;