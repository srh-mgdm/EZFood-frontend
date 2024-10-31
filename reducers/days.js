import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const daysSlice = createSlice({
  name: "days",
  initialState,
  reducers: {
    addDay: (state, action) => {
      state.value.push = action.payload;
    },
    setDays: (state, action) => {
      state.value = action.payload;
    },
    deleteDay: (state, action) => {
      state.value = action.payload;
    },
    deleteMealFromDay: (state, action) => {
      //   const { dayId, mealPosition } = action.payload;
      //   const day = state.value.find((day) => day.dayId === dayId);
      //   if (day) {
      //     day.meals[mealPosition] = { mealId: null, mealName: null };
      //   }

      const { dayId, mealPosition } = action.payload;
      const updatedDay = state.value.find((day) => day.dayId === dayId);
      if (!updatedDay) {
        return;
      }
      const updatedMeals = [...updatedDay.meals];
      updatedMeals[mealPosition] = { mealId: null, mealName: null };
      return { ...day, meals: updatedMeals };
    },
  },
});

export const { addDay, setDays, deleteDay, deleteMealFromDay } =
  daysSlice.actions;

export default daysSlice.reducer;
