import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PizzaType = {
    id: string,
    description: string,
    types: string[],
    sizes: string[]
    diameters: number[],
    weights: number[],
    cost: number,
    name: string,
    imageURL: string
};

interface OverlayState {
    opened: boolean;
    pizza: PizzaType;
};

const initialState = {
    opened: false,
    pizza: {
        id: "unknown",
        description: "unknown",
        types: [],
        sizes: [],
        diameters: [],
        weights: [],
        cost: 0,
        name: "unknown",
        imageURL: "unknown"
    }
} as OverlayState;

export const overlaySlice = createSlice({
    name: "overlay",
    initialState,
    reducers: {
        setOpened(state, action: PayloadAction<boolean>) {
            state.opened = action.payload;
        },
        setPizza(state, action: PayloadAction<PizzaType>) {
            state.pizza = action.payload;
        }
    }
});

export const {
    setOpened,
    setPizza
} = overlaySlice.actions;

export default overlaySlice.reducer;