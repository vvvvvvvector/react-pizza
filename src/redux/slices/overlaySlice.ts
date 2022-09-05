import { createSlice } from "@reduxjs/toolkit";

type PizzaType = {
    id: string,
    types: string[],
    diameter: string[],
    name: string,
    cost: number,
    imageURL: string,
    sizes: string[]
}

interface OverlaySliceState {
    opened: boolean;
    pizza: PizzaType | null;
}

const initialState: OverlaySliceState = {
    opened: false,
    pizza: null
};

export const overlaySlice = createSlice({
    name: "overlay",
    initialState,
    reducers: {
        setOpened(state, action) {
            state.opened = action.payload;
        },
        setPizza(state, action) {
            state.pizza = action.payload;
            state.opened = true;
        }
    }
});

export const {
    setOpened,
    setPizza
} = overlaySlice.actions;

export default overlaySlice.reducer;