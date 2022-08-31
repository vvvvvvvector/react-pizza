import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        orderTotal: 0,
        pizzasAmount: 0,
        pizzas: []
    },
    reducers: {
        addPizza(state, action) {
            state.pizzas.push(action.payload);
        },
        removePizza(state, action) {
            state.pizzas = state.pizzas.filter((pizza) => pizza.id !== action.payload);
        },
        clearCart(state) {
            state.pizzas = [];
        }
    }
});

export const {
    removePizza,
    clearCart,
    addPizza
} = cartSlice.actions;

export default cartSlice.reducer;