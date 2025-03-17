import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "@/features/auth/authActions.ts";

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
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
    builder.addCase(userLogin.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "'";
    });
  },
});

export default authSlice.reducer;
