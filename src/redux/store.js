import { configureStore } from "@reduxjs/toolkit";

import home from "./slices/homeSlice";

export const store = configureStore({
    reducer: {
        home
    }
});
