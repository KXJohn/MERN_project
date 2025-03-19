import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  UserData,
  userLogin,
} from "@/features/auth/authActions.ts";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

interface AuthState {
  userToken: string;
  loading: boolean;
  error: string;
  success: boolean;
  userInfo: UserData;
}

const initialState: AuthState = {
  loading: false,
  userInfo: { id: "", token: "", name: "", email: "" },
  userToken: userToken ?? "",
  error: "",
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "'";
    });
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userInfo = payload;
      state.userToken = payload.token;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "'";
    });
  },
});

export default authSlice.reducer;
