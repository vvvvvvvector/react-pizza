import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        pizzas: [
            {
                "id": 1,
                "type": "Thin",
                "diameter": 30,
                "name": "Margherita",
                "cost": 7,
                "imageURL": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
                "amount": 3
            }, {
                "id": 2,
                "type": "Traditional",
                "diameter": 35,
                "name": "Four seasons",
                "cost": 9,
                "imageURL": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
                "amount": 1
            }, {
                "id": 3,
                "type": "Thin",
                "diameter": 25,
                "name": "Pepperoni",
                "cost": 7,
                "imageURL": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg",
                "amount": 2
            }
        ]
    },
    reducers: {
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
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;