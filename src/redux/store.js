import { configureStore } from "@reduxjs/toolkit";

import home from "./slices/homeSlice";
import cart from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        home,
        cart
    }
});
