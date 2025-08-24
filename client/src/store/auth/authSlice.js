import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  avatar: null,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.user;
      state.avatar = action.payload.avatar;
    },

    logout: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.avatar = null;
    },
  },
});


export const {login , logout} = authSlice.actions

export default authSlice.reducer