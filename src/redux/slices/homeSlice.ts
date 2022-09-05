import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomeState {
    selectedCategoryIndex: number;
    selectedCategoryName: string;
    selectedSortParameterIndex: number;
    currentPage: number;
    searchValue: string;
};

const initialState= {
    selectedCategoryIndex: 0,
    selectedCategoryName: "All",
    selectedSortParameterIndex: 0,
    currentPage: 1,
    searchValue: ""
} as HomeState;

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setCategoryIndex(state, action: PayloadAction<number>) {
            state.selectedCategoryIndex = action.payload;
            state.currentPage = 1;
        },
        setSortParameter(state, action: PayloadAction<number>) {
            state.selectedSortParameterIndex = action.payload;
            state.currentPage = 1;
        },
        setCategoryName(state, action: PayloadAction<string>) {
            state.selectedCategoryName = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        }
    }
});

export const {
    setCategoryIndex,
    setCategoryName,
    setSortParameter,
    setCurrentPage,
    setSearchValue
} = homeSlice.actions;

export default homeSlice.reducer;