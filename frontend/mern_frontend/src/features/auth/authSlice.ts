import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  registerUser,
  UserData,
  userLogin,
} from "@/features/auth/authActions.ts";

const userToken = localStorage.getItem("userToken") || "";

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
  userToken: userToken,
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
      state.userToken = "";
      state.userInfo = { email: "", name: "", token: "", id: "" };
      state.success = false;
    },

    setCredentials: (state: AuthState, { payload }: PayloadAction<UserData>) => {
      state.userInfo = payload;
      // If token is in the payload, update userToken and localStorage
      if (payload.token) {
        state.userToken = payload.token;
        localStorage.setItem("userToken", payload.token);
      }
    },
    
    clearError: (state: AuthState) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // Register user
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
      state.error = action.payload?.message || "Registration failed";
    });
    
    // Login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userInfo = payload;
      state.userToken = payload.token || "";
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Login failed";
    });
  },
});

export const { logoutUser, setCredentials, clearError } = authSlice.actions;
export default authSlice.reducer;
