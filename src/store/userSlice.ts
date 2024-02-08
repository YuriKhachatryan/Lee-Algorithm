import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../constants";

interface UserState {
  userData:
    | Array<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        age: string;
        password: string;
      }>
    | null
    | undefined;
}

const initialState: UserState = {
  userData: null,
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/users`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId: string) => {
    try {
      await axios.delete(`${API_ENDPOINT}/users/${userId}`);
      return userId;
    } catch (error) {
      throw error;
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload: { userId: string; body: any }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users/${payload.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload.body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return payload;
    } catch (error) {
      throw error;
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (signupData: any) => {
    try {
      const response = await axios.post(`${API_ENDPOINT}/users`, signupData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<
        Array<{
          id: string;
          email: string;
          firstName: string;
          lastName: string;
          age: string;
          password: string;
        }>
      >
    ) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.userData = state.userData?.filter(
        (user) => user.id !== action.payload
      );
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const { userId, body } = action.payload;
      state.userData = state.userData?.map((user) =>
        user.id === userId ? { ...user, ...body } : user
      );
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      const userData = action.payload;
      state.userData = state.userData
        ? [...state.userData, userData]
        : [userData];
    });
  },
});

export const { setUserData } = userSlice.actions;
export const selectUserData = (state: { user: UserState }) =>
  state.user.userData;

export default userSlice.reducer;
