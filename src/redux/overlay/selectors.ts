import { RootState } from "../store";

export const selectOpened = (state: RootState) => state.overlay.opened;
export const selectPizza = (state: RootState) => state.overlay.pizza;
