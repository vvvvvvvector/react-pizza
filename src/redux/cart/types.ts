export type UniquePizzaType = {
  name: string;
  type: string;
  diameter: number;
};

export type CartItemType = {
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
  pizzas: CartItemType[];
}
