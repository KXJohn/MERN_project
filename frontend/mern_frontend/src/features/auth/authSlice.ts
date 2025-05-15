import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  registerUser,
  UserData,
  userLogin,
  logoutUserAction,
  checkAuthStatus,
} from "@/features/auth/authActions.ts";

interface AuthState {
  userToken: string; // We'll keep this for backward compatibility, but won't use localStorage
  loading: boolean;
  error: string;
  success: boolean;
  userInfo: UserData;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  loading: false,
  userInfo: { email: "", name: "", token: "", id: "" },
  userToken: "",
  error: "",
  success: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state: AuthState) => {
      // We don't need to remove anything from localStorage anymore
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
      state.isAuthenticated = true;
      // We don't store the token anymore - using HttpOnly cookies
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Login failed";
    });
    
    // Logout user
    builder.addCase(logoutUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUserAction.fulfilled, (state) => {
      state.loading = false;
      state.userInfo = { email: "", name: "", token: "", id: "" };
      state.userToken = "";
      state.success = false;
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUserAction.rejected, (state) => {
      state.loading = false;
      // Even if logout fails server-side, we clear the state
      state.userInfo = { email: "", name: "", token: "", id: "" };
      state.userToken = "";
      state.success = false;
      state.isAuthenticated = false;
    });
    
    // Check auth status
    builder.addCase(checkAuthStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkAuthStatus.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.isAuthenticated = true;
    });
    builder.addCase(checkAuthStatus.rejected, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    });
  },
});

export const { logoutUser, setCredentials, clearError } = authSlice.actions;
export default authSlice.reducer;
