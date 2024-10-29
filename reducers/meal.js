import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {  },
};

export const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    addMeal: (state, action) => {
      
    },
    
  },
});

export const { } = mealSlice.actions;
export default mealSlice.reducer;
