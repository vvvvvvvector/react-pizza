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
            state.orderTotal = state.pizzas.reduce((sum, obj) => obj.cost * obj.amount + sum, 0);
            state.pizzasAmount = state.pizzas.reduce((sum, obj) => obj.amount + sum, 0);
        },
        removePizza(state, action) {
            state.pizzas = state.pizzas.filter((pizza) => pizza.id !== action.payload);
            state.orderTotal = state.pizzas.reduce((sum, obj) => obj.cost * obj.amount + sum, 0);
            state.pizzasAmount = state.pizzas.reduce((sum, obj) => obj.amount + sum, 0);
        },
        clearCart(state) {
            state.pizzas = [];
            state.orderTotal = 0;
            state.pizzasAmount = 0;
        },
        incrementAmount(state, action) {
            const pizza = state.pizzas.find((obj) => obj.id === action.payload);
            pizza.amount++;
            state.orderTotal = state.pizzas.reduce((sum, obj) => obj.cost * obj.amount + sum, 0);
            state.pizzasAmount++;
        },
        decrementAmount(state, action) {
            const pizza = state.pizzas.find((obj) => obj.id === action.payload);
            pizza.amount--;
            state.orderTotal = state.pizzas.reduce((sum, obj) => obj.cost * obj.amount + sum, 0);
            state.pizzasAmount--;
        }
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