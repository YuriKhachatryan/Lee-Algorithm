import { createSlice } from "@reduxjs/toolkit";

type SigninState = {
  isAuth: boolean;
};

const initialState: SigninState = {
  isAuth: false,
};

const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    changeIsAuth: (state) => {
      state.isAuth = !state.isAuth;
    },
  },
});

export const { changeIsAuth } = signinSlice.actions;

export default signinSlice.reducer;
