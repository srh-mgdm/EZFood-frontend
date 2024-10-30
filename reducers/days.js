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
    deleteMeal: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addDay, setDays, deleteDay, deleteMeal } = daysSlice.actions;

export default daysSlice.reducer;
