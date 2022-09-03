import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: "home",
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
            state.currentPage = 1;
        },
        setSortParameter(state, action) {
            state.selectedSortParameterIndex = action.payload;
            state.currentPage = 1;
        },
        setCategoryName(state, action) {
            state.selectedCategoryName = action.payload;
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
} = homeSlice.actions;

export default homeSlice.reducer;