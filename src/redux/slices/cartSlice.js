import { createSlice } from "@reduxjs/toolkit";

const calculateOrderTotal = (state) => {
    state.orderTotal = state.pizzas.reduce((sum, obj) => obj.cost * obj.amount + sum, 0);
};

const calculateAmountTotal = (state) => {
    state.amountTotal = state.pizzas.reduce((sum, obj) => obj.amount + sum, 0);
};

const trulySelectedPizza = (pizza, action) => {
    return pizza.name === action.payload.name && pizza.type === action.payload.type && pizza.diameter === action.payload.diameter;
};

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        orderTotal: 0,
        amountTotal: 0,
        pizzas: []
    },
    reducers: {
        addPizza(state, action) {
            const foundedPizza = state.pizzas.find((obj) => trulySelectedPizza(obj, action));
            foundedPizza ? foundedPizza.amount++ : state.pizzas.push(action.payload);

            calculateOrderTotal(state);
            calculateAmountTotal(state);
        },
        removePizza(state, action) {
            state.pizzas = state.pizzas.filter((pizza) => pizza.name !== action.payload.name || pizza.type !== action.payload.type || pizza.diameter !== action.payload.diameter);

            calculateOrderTotal(state);
            calculateAmountTotal(state);
        },
        incrementAmount(state, action) {
            const pizza = state.pizzas.find((obj) => trulySelectedPizza(obj, action));
            pizza.amount++;

            calculateOrderTotal(state);
            state.amountTotal++;
        },
        decrementAmount(state, action) {
            const pizza = state.pizzas.find((obj) => trulySelectedPizza(obj, action));
            pizza.amount--;

            calculateOrderTotal(state);
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