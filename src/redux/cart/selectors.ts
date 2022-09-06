import { RootState } from "../store";

import { PizzaType } from "../fetch/types";

export const selectCart = (state: RootState) => state.cart;

export const selectCartItem = (pizza: PizzaType, selectedType: number, selectedSize: number) => (state: RootState) =>
    state.cart.pizzas.find((obj) => obj.name === pizza.name && obj.type === pizza.types[selectedType] && obj.diameter === pizza.diameters[selectedSize]);