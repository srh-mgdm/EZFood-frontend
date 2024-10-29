import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    addMeal: (state, action) => {
        state.value = action.payload;
    },
    
    deleteMeal: (state, action) => {
      state.value = action.payload
    }
  },
});

export const { addMeal , deleteMeal} = mealSlice.actions;
export default mealSlice.reducer;
