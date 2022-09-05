import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const calculateOrderTotal = (state: CartState) => {
    state.orderTotal = state.pizzas.reduce((sum, obj) => obj.cost * obj.amount + sum, 0);
};

const calculateAmountTotal = (state: CartState) => {
    state.amountTotal = state.pizzas.reduce((sum, obj) => obj.amount + sum, 0);
};

const trulySelectedPizza = (pizza: CartItemType, action: PayloadAction<{
    name: string,
    type: string,
    diameter: number
}>) => {
    return pizza.name === action.payload.name && pizza.type === action.payload.type && pizza.diameter === action.payload.diameter;
};

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

type CartItemType = {
    id: string,
    name: string,
    cost: number,
    imageURL: string,
    type: string,
    diameter: number,
    amount: number
};

interface CartState {
    orderTotal: number;
    amountTotal: number;
    pizzas: CartItemType[];
}

const initialState= {
    orderTotal: 0,
    amountTotal: 0,
    pizzas: []
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
        removePizza(state, action: PayloadAction<{
            name: string,
            type: string,
            diameter: number
        }>) {
            state.pizzas = state.pizzas.filter((pizza) => pizza.name !== action.payload.name || pizza.type !== action.payload.type || pizza.diameter !== action.payload.diameter);

            calculateOrderTotal(state);
            calculateAmountTotal(state);
        },
        incrementAmount(state, action: PayloadAction<{
            name: string,
            type: string,
            diameter: number
        }>) {
            const pizza = state.pizzas.find((obj) => trulySelectedPizza(obj, action));

            if (pizza) {
                pizza.amount++;
                calculateOrderTotal(state);
                state.amountTotal++;
            }
        },
        decrementAmount(state, action: PayloadAction<{
            name: string,
            type: string,
            diameter: number
        }>) {
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

export const selectCartItem = (pizza: PizzaType, selectedType: number, selectedSize: number) => (state: RootState) =>
    state.cart.pizzas.find((obj) => obj.name === pizza.name && obj.type === pizza.types[selectedType] && obj.diameter === pizza.diameter[selectedSize]);

export const {
    removePizza,
    clearCart,
    addPizza,
    incrementAmount,
    decrementAmount
} = cartSlice.actions;

export default cartSlice.reducer;