import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: "filter",
    initialState: {
        selectedCategoryIndex: 0,
        selectedCategoryName: "All",
        selectedSortParameterIndex: 0,
        currentPage: 1,
        searchValue: ""
    },
    reducers: {
        setCategoryIndex(state, action) {
            state.selectedCategoryIndex = action.payload;
        },
        setCategoryName(state, action) {
            state.selectedCategoryName = action.payload;
        },
        setSortParameter(state, action) {
            state.selectedSortParameterIndex = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setSearchValue(state, action) {
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
} = filterSlice.actions;

export default filterSlice.reducer;