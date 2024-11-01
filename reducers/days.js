import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const daysSlice = createSlice({
  name: "days",
  initialState,
  reducers: {
    agitddDay: (state, action) => {
      state.value.push = action.payload;
    },
    setDays: (state, action) => {
      state.value = action.payload;
    },
    deleteDay: (state, action) => {
      state.value = action.payload;
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
      updatedMeals[mealPosition] = { mealId: null, mealName: null };
      updatedDay.meals = updatedMeals;

      const updatedDays = [...state.value];
      updatedDays[dayIndex] = updatedDay;
      state.value = updatedDays;
    },
  },
});

export const { addDay, setDays, deleteDay, deleteMealFromDay } =
  daysSlice.actions;

export default daysSlice.reducer;
