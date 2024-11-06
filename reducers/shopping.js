import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        checkList:[]
  }
};

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setShopCheckList: (state, action) => {
            state.value.checkList = action.payload;
          },
    },
});



// Exporting actions so they can be used in other components
export const { setShopCheckList } = shopSlice.actions;

// Exporting the reducer to be used in the Redux store
export default shopSlice.reducer;