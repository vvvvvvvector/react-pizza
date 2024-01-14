import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { type IOverlayState } from './types';
import { type Pizza } from '../fetch/types';

const initialState: IOverlayState = {
  opened: false,
  pizza: {
    id: 'unknown',
    description: 'unknown',
    types: [],
    sizes: [],
    diameters: [],
    weights: [],
    cost: 0,
    name: 'unknown',
    imageURL: 'unknown'
  }
};

export const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    setOpened(state, action: PayloadAction<boolean>) {
      state.opened = action.payload;
    },
    setPizza(state, action: PayloadAction<Pizza>) {
      state.pizza = action.payload;
    }
  }
});

export const { setOpened, setPizza } = overlaySlice.actions;

export default overlaySlice.reducer;
