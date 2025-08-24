import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducers,
  },
});
