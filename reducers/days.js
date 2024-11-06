import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const daysSlice = createSlice({
  name: "days",
  initialState,
  reducers: {
    // agitddDay: (state, action) => {
    //   state.value.push = action.payload;
    // },
    setDays: (state, action) => {
      state.value = action.payload;
    },
    deleteDays: (state, action) => {
      state.value = [];
    },
    addMealToDay: (state, action) => {
      const { dayId, mealId, mealName, mealPosition, mealImage } =
        action.payload;
      const dayIndex = state.value.findIndex((day) => day._id === dayId);

      // Day not found in state ?
      if (dayIndex === -1) {
        return;
      }
      const updatedDay = { ...state.value[dayIndex] };
      const updatedMeals = [...updatedDay.meals];
      updatedMeals[mealPosition] = {
        mealId: mealId,
        mealName: mealName,
        mealImage: mealImage,
      };
      updatedDay.meals = updatedMeals;

      const updatedDays = [...state.value];
      updatedDays[dayIndex] = updatedDay;
      state.value = updatedDays;
    },
    deleteMealFromDay: (state, action) => {
      const { dayId, mealPosition } = action.payload;
      const dayIndex = state.value.findIndex((day) => day._id === dayId);

      // Day not found in state ?
      if (dayIndex === -1) {
        return;
      }

      const updatedDay = { ...state.value[dayIndex] };
      const updatedMeals = [...updatedDay.meals];
      updatedMeals[mealPosition] = {
        mealId: null,
        mealName: null,
        mealImage: null,
      };
      updatedDay.meals = updatedMeals;

      const updatedDays = [...state.value];
      updatedDays[dayIndex] = updatedDay;
      state.value = updatedDays;
    },
  },
});

export const { addDay, setDays, deleteDays, addMealToDay, deleteMealFromDay } =
  daysSlice.actions;

export default daysSlice.reducer;
