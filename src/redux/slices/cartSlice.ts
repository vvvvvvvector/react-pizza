import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

type UniqiePizzaType = {
    name: string,
    type: string,
    diameter: number
};

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

type CartItemType = {
    name: string,
    type: string,
    diameter: number,
    cost: number,
    amount: number,
    imageURL: string
};

interface CartState {
    orderTotal: number;
    amountTotal: number;
    pizzas: CartItemType[];
};

const getCartFromLS = () => {
    const data = localStorage.getItem("cart");

    if (data) {
        const parsed: CartItemType[] = JSON.parse(data);

        const orderTotal = parsed.reduce((sum, obj) => obj.cost * obj.amount + sum, 0);
        const orderAmount = parsed.reduce((sum, obj) => obj.amount + sum, 0);

        return { pizzas: parsed, orderTotal: orderTotal, orderAmount: orderAmount };
    }

    return { pizzas: [], orderTotal: 0, orderAmount: 0 };
};

const { orderTotal, orderAmount, pizzas } = getCartFromLS();

const initialState = {
    orderTotal: orderTotal,
    amountTotal: orderAmount,
    pizzas: pizzas
} as CartState;

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addPizza(state, action: PayloadAction<CartItemType>) {
            const foundedPizza = state.pizzas.find((obj) => trulySelectedPizza(obj, action));
            foundedPizza ? foundedPizza.amount++ : state.pizzas.push(action.payload);

            calculateOrderTotal(state);
            calculateAmountTotal(state);
        },
        removePizza(state, action: PayloadAction<UniqiePizzaType>) {
            state.pizzas = state.pizzas.filter((pizza) => pizza.name !== action.payload.name || pizza.type !== action.payload.type || pizza.diameter !== action.payload.diameter);

            calculateOrderTotal(state);
            calculateAmountTotal(state);
        },
        incrementAmount(state, action: PayloadAction<UniqiePizzaType>) {
            const pizza = state.pizzas.find((obj) => trulySelectedPizza(obj, action));

            if (pizza) {
                pizza.amount++;
                calculateOrderTotal(state);
                state.amountTotal++;
            }
        },
        decrementAmount(state, action: PayloadAction<UniqiePizzaType>) {
            const pizza = state.pizzas.find((obj) => trulySelectedPizza(obj, action));

            if (pizza) {
                pizza.amount--;
                calculateOrderTotal(state);
                state.amountTotal--;
            }
        },
        clearCart(state) {
            state.pizzas = [];
            state.orderTotal = 0;
            state.amountTotal = 0;
        },
    }
});

const calculateOrderTotal = (state: CartState) => {
    state.orderTotal = state.pizzas.reduce((sum, obj) => obj.cost * obj.amount + sum, 0);
};

const calculateAmountTotal = (state: CartState) => {
    state.amountTotal = state.pizzas.reduce((sum, obj) => obj.amount + sum, 0);
};

const trulySelectedPizza = (pizza: CartItemType, action: PayloadAction<UniqiePizzaType>) => {
    return pizza.name === action.payload.name && pizza.type === action.payload.type && pizza.diameter === action.payload.diameter;
};

export const selectCartItem = (pizza: PizzaType, selectedType: number, selectedSize: number) => (state: RootState) =>
    state.cart.pizzas.find((obj) => obj.name === pizza.name && obj.type === pizza.types[selectedType] && obj.diameter === pizza.diameters[selectedSize]);

export const {
    removePizza,
    clearCart,
    addPizza,
    incrementAmount,
    decrementAmount
} = cartSlice.actions;

export default cartSlice.reducer;