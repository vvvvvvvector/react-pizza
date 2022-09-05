import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type FetchType = {
    currentPage: number,
    categoryIndex: number,
    sortParameterName: string,
    sortParameterIndex: number
};

export const fetchHomePizzas = createAsyncThunk<PizzaType[], FetchType>("fetch/homePizzas", async (parameters) => {
    const {
        currentPage,
        categoryIndex,
        sortParameterName,
        sortParameterIndex
    } = parameters;

    const { data } = await axios.get<PizzaType[]>(
        `https://62e2f40c3891dd9ba8f276a3.mockapi.io/pizzas?page=${currentPage}&limit=4&categories=${categoryIndex}&sortBy=${sortParameterName}&order=${sortParameterIndex % 2 === 0 ? "asc" : "desc"}`
    );

    return data;
});

type PizzaType = {
    id: string,
    types: string[],
    diameter: number[],
    description: string,
    name: string,
    weight: number[],
    cost: number,
    imageURL: string,
    sizes: string[]
};

interface FetchState {
    status: string;
    homePizzas: PizzaType[];
};

const initialState = {
    status: "pending",
    homePizzas: []
} as FetchState;

export const fetchSlice = createSlice({
    name: "fetch",
    initialState,
    reducers: {
        // fill in primary logic here
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHomePizzas.pending, (state) => {
            state.status = "pending";
            state.homePizzas = [];
        });
        builder.addCase(fetchHomePizzas.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.homePizzas = action.payload;
        });
        builder.addCase(fetchHomePizzas.rejected, (state) => {
            state.status = "failed";
            state.homePizzas = [];
        });
    }
});

export default fetchSlice.reducer;