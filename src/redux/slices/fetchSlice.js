import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHomePizzas = createAsyncThunk("fetch/homePizzas", async (parameters) => {
    const {
        currentPage,
        categoryIndex,
        sortParameterName,
        sortParameterIndex
    } = parameters;

    const { data } = await axios.get(
        `https://62e2f40c3891dd9ba8f276a3.mockapi.io/pizzas?page=${currentPage}&limit=4&categories=${categoryIndex}&sortBy=${sortParameterName}&order=${sortParameterIndex % 2 === 0 ? "asc" : "desc"}`
    );

    return data;
});

export const fetchSlice = createSlice({
    name: "fetch",
    initialState: {
        status: "loading",
        homePizzas: []
    },
    extraReducers: {
        [fetchHomePizzas.pending]: (state) => {
            state.status = "loading";
            state.homePizzas = [];
        },
        [fetchHomePizzas.fulfilled]: (state, action) => {
            state.status = "success";
            state.homePizzas = action.payload;
        },
        [fetchHomePizzas.rejected]: (state) => {
            state.status = "error";
            state.homePizzas = [];
        }
    }
});

export default fetchSlice.reducer;