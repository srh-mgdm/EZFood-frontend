import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    addMeal: (state, action) => {
        state.value.push(action.payload);
    },
    
  },
});

export const { addMeal } = mealSlice.actions;
export default mealSlice.reducer;
