import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';

import home from "./home/slice";
import cart from "./cart/slice";
import fetch from "./fetch/slice";
import overlay from "./overlay/slice";

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