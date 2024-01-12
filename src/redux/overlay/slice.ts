import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOverlayState } from './types';
import { Pizza } from '../fetch/types';

const initialState = {
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
} as IOverlayState;

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
