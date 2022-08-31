import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        orderTotal: 0,
        amountTotal: 0,
        pizzas: []
    },
    reducers: {
        addPizza(state, action) {
            const findItem = state.pizzas.find((obj) => obj.name === action.payload.name && obj.type === action.payload.type && obj.diameter === action.payload.diameter);

            if (findItem) {
                findItem.amount++;
            } else {
                state.pizzas.push(action.payload);
            }

            state.orderTotal = state.pizzas.reduce((sum, obj) => obj.cost * obj.amount + sum, 0);
            state.amountTotal = state.pizzas.reduce((sum, obj) => obj.amount + sum, 0);
        },
        removePizza(state, action) {
            state.pizzas = state.pizzas.filter((pizza) => pizza.name !== action.payload.name || pizza.type !== action.payload.type || pizza.diameter !== action.payload.diameter);
            state.orderTotal = state.pizzas.reduce((sum, obj) => obj.cost * obj.amount + sum, 0);
            state.amountTotal = state.pizzas.reduce((sum, obj) => obj.amount + sum, 0);
        },
        incrementAmount(state, action) {
            const pizza = state.pizzas.find((obj) => obj.name === action.payload.name && obj.type === action.payload.type && obj.diameter === action.payload.diameter);
            pizza.amount++;
            state.orderTotal = state.pizzas.reduce((sum, obj) => obj.cost * obj.amount + sum, 0);
            state.amountTotal++;
        },
        decrementAmount(state, action) {
            const pizza = state.pizzas.find((obj) => obj.name === action.payload.name && obj.type === action.payload.type && obj.diameter === action.payload.diameter);
            pizza.amount--;
            state.orderTotal = state.pizzas.reduce((sum, obj) => obj.cost * obj.amount + sum, 0);
            state.amountTotal--;
        },
        clearCart(state) {
            state.pizzas = [];
            state.orderTotal = 0;
            state.amountTotal = 0;
        },
    }
});

export const {
    removePizza,
    clearCart,
    addPizza,
    incrementAmount,
    decrementAmount
} = cartSlice.actions;

export default cartSlice.reducer;