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
  userInfo: { email: "", name: "", token: "", id: "" },
  userToken: userToken ?? "",
  error: "",
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state: AuthState) => {
      localStorage.removeItem("userToken");
      state.error = "";
      state.loading = false;
      state.userToken = initialState.userToken;
      state.userInfo = initialState.userInfo;
    },

    setCredentials: (state: AuthState, { payload }) => {
      state.userInfo = payload;
    },
  },
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
      state.userToken = payload.token ?? "";
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "'";
    });
  },
});

export const { logoutUser, setCredentials } = authSlice.actions;
export default authSlice.reducer;
