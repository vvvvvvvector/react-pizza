import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Pizza, RequestParametersTypes, Status, IFetchState } from './types';

export const fetchHomePizzas = createAsyncThunk<
  Pizza[],
  RequestParametersTypes
>('fetch/homePizzas', async (parameters) => {
  const { currentPage, categoryIndex, sortParameterName, sortParameterIndex } =
    parameters;

  const { data } = await axios.get<Pizza[]>(
    `https://62e2f40c3891dd9ba8f276a3.mockapi.io/pizzas?p=${currentPage}&l=4&categories=${categoryIndex}&sortBy=${sortParameterName}&order=${
      sortParameterIndex % 2 === 0 ? 'asc' : 'desc'
    }`
  );

  return data;
});

const initialState: IFetchState = {
  status: Status.PENDING,
  homePizzas: []
};

export const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    // fill in primary logic here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomePizzas.pending, (state) => {
      state.status = Status.PENDING;
      state.homePizzas = [];
    });
    builder.addCase(fetchHomePizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED;
      state.homePizzas = action.payload;
    });
    builder.addCase(fetchHomePizzas.rejected, (state) => {
      state.status = Status.FAILED;
      state.homePizzas = [];
    });
  }
});

export default fetchSlice.reducer;
