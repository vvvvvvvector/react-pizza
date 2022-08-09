import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: "filter",
    initialState: {
        selectedCategoryIndex: 0,
        selectedCategoryName: "All",
        selectedSortParameterIndex: 0,
        currentPage: 1
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
        }
    }
});

export const { setCategoryIndex, setCategoryName, setSortParameter, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;