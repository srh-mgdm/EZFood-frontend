import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: "", username: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
    },
  },
});
//Ce code exporte les Action Creators `login` et `logout`, qui sont utilisés pour créer des actions dans Redux.
export const { login, logout } = userSlice.actions; 
//Ce code exporte le Reducer de `userSlice`, qui gère les changements du state utilisateur dans Redux.
export default userSlice.reducer;
