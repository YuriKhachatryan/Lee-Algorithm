import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { API_ENDPOINT } from "../constants";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const authData = await response.json();

      const user = authData.find(
        (u: { email: string; password: string }) =>
          u.email === credentials.username &&
          u.password === credentials.password
      );

      if (user) {
        thunkAPI.dispatch(setAuthenticated(true));
      } else {
        console.log("Invalid credentials");
      }

      return authData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const { setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
