import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';

import home from "./slices/homeSlice";
import cart from "./slices/cartSlice";
import fetch from "./slices/fetchSlice";
import overlay from "./slices/overlaySlice";

export const store = configureStore({
    reducer: {
        home,
        cart,
        fetch,
        overlay
    }
});

export type RootState = ReturnType<typeof store.getState>;

// -----for async actions(in home page fetchHomePizzas)-----
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
// -----for async actions(in home page fetchHomePizzas)-----