import { createSlice } from "@reduxjs/toolkit";

export const overlaySlice = createSlice({
    name: "overlay",
    initialState: {
        opened: false,
        pizza: null
    },
    reducers: {
        setOpened(state, action) {
            state.opened = action.payload;
        },
        setPizza(state, action) {
            state.pizza = action.payload;
        }
    }
});

export const {
    setOpened,
    setPizza
} = overlaySlice.actions;

export default overlaySlice.reducer;