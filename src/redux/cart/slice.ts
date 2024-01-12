import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartItem, UniquePizza, ICartState } from './types';

const getCartFromLS = () => {
  const data = localStorage.getItem('cart');

  if (data) {
    const parsed: CartItem[] = JSON.parse(data);

    const orderTotal = parsed.reduce(
      (sum, obj) => obj.cost * obj.amount + sum,
      0
    );
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
} as ICartState;

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action: PayloadAction<CartItem>) {
      const foundedPizza = state.pizzas.find((obj) =>
        trulySelectedPizza(obj, action)
      );
      foundedPizza ? foundedPizza.amount++ : state.pizzas.push(action.payload);

      calculateOrderTotal(state);
      calculateAmountTotal(state);
    },
    removePizza(state, action: PayloadAction<UniquePizza>) {
      state.pizzas = state.pizzas.filter(
        (pizza) =>
          pizza.name !== action.payload.name ||
          pizza.type !== action.payload.type ||
          pizza.diameter !== action.payload.diameter
      );

      calculateOrderTotal(state);
      calculateAmountTotal(state);
    },
    incrementAmount(state, action: PayloadAction<UniquePizza>) {
      const pizza = state.pizzas.find((obj) => trulySelectedPizza(obj, action));

      if (pizza) {
        pizza.amount++;
        calculateOrderTotal(state);
        state.amountTotal++;
      }
    },
    decrementAmount(state, action: PayloadAction<UniquePizza>) {
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
    }
  }
});

const calculateOrderTotal = (state: ICartState) => {
  state.orderTotal = state.pizzas.reduce(
    (sum, obj) => obj.cost * obj.amount + sum,
    0
  );
};

const calculateAmountTotal = (state: ICartState) => {
  state.amountTotal = state.pizzas.reduce((sum, obj) => obj.amount + sum, 0);
};

const trulySelectedPizza = (
  pizza: CartItem,
  action: PayloadAction<UniquePizza>
) => {
  return (
    pizza.name === action.payload.name &&
    pizza.type === action.payload.type &&
    pizza.diameter === action.payload.diameter
  );
};

export const {
  removePizza,
  clearCart,
  addPizza,
  incrementAmount,
  decrementAmount
} = cartSlice.actions;

export default cartSlice.reducer;
