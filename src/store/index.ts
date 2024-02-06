import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "./signin-slice";

export const store = configureStore({
  reducer: {
    signin: signinReducer,
  },
});
