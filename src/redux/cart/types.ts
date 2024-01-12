export type UniquePizza = {
  name: string;
  type: string;
  diameter: number;
};

export type CartItem = {
  name: string;
  cost: number;
  imageURL: string;
  type: string;
  diameter: number;
  amount: number;
};

export interface ICartState {
  orderTotal: number;
  amountTotal: number;
  pizzas: CartItem[];
}
