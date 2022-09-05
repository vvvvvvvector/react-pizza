import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PizzaType = {
    id: string,
    types: string[],
    diameter: number[],
    description: string,
    name: string,
    weight: number[],
    cost: number,
    imageURL: string,
    sizes: string[]
};

interface OverlayState {
    opened: boolean;
    pizza: PizzaType;
};

const initialState = {
    opened: false,
    pizza: {
        id: "unknown",
        types: [],
        diameter: [],
        weight: [],
        description: "unknown",
        name: "unknown",
        cost: 0,
        imageURL: "unknown",
        sizes: []
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