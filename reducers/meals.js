import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    meals: [], //an array to store all meals fetched from the backend.
    selectedMeal: null, //an object to store the name and id of a selected meal.
    selectedMealDetails: null, //an object to store the details of a selected meal.
  },
};

// Creating the meal slice
export const mealSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    // setMeals: updates the meals array in the value state with data fetched from the backend.
    setMeals: (state, action) => {
      state.value.meals = action.payload;

    },

    // selectMeal: stores the selected meal's details in the value state.
    selectMeal: (state, action) => {
      state.value.selectedMeal = action.payload;
    },

    selectMealDetail: (state, action) => {
      state.value.selectedMealDetails = action.payload;
    },

    // clearSelectedMeal: clears the selectedMeal in the value state, setting it back to null.
    clearSelectedMeal: (state) => {
      state.value.selectedMeal = null;
    },
  },
});

// Exporting actions so they can be used in other components
export const { setMeals, selectMeal, selectMealDetail, clearSelectedMeal } = mealSlice.actions;

// Exporting the reducer to be used in the Redux store
export default mealSlice.reducer;
