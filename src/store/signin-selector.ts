import { createSelector } from "@reduxjs/toolkit";

export const signinSelector = (state: any) => state.signin;

export const isAuthSelector = createSelector(
  signinSelector,
  (signin) => signin.isAuth
);
