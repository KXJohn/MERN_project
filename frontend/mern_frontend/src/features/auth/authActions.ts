import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LogInFormValue } from "@/places/types.ts";
import { AppDispatch } from "@/store.ts";
import { SERVER_URL } from "@/constants.ts";
import { MyKnownError } from "@/features/common.ts";

export interface UserData {
  email: string;
  name: string;
  token?: string;
  id: string;
  imageUrl?: string;
  placeCount?: number;
}

interface UserAttributes {
  password: string;
  email: string;
}

// Helper to extract error message from axios error
const getErrorMessage = (error: any): string => {
  if (error.response?.data?.error) {
    return error.response.data.error;
  } else if (error.response?.data?.message) {
    return error.response.data.message;
  } else if (error.message) {
    return error.message;
  }
  return 'An unknown error occurred';
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (registerInfo: LogInFormValue, { rejectWithValue }) => {
    const { name, email, password } = registerInfo;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true // Required for cookies to be sent with request
      };

      const { data } = await axios.post(
        `${SERVER_URL}/api/user/signup`,
        { name, email, password },
        config,
      );
      
      return data;
    } catch (error: any) {
      return rejectWithValue({
        message: getErrorMessage(error)
      });
    }
  },
);

export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/api/user/profile`,
        { withCredentials: true }
      );
      
      if (data && data.id) {
        return data;
      } else {
        return rejectWithValue({ message: "Not authenticated" });
      }
    } catch (error: any) {
      return rejectWithValue({
        message: "Not authenticated"
      });
    }
  }
);

export const logoutUserAction = createAsyncThunk(
  "auth/logout", 
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        `${SERVER_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      return { success: true };
    } catch (error: any) {
      return rejectWithValue({
        message: getErrorMessage(error)
      });
    }
  }
);

export const userLogin = createAsyncThunk<
  // Return type of the payload creator
  UserData,
  // First argument to the payload creator
  UserAttributes,
  // Types for ThunkAPI
  {
    dispatch: AppDispatch;
    rejectValue: MyKnownError;
  }
>("auth/login", async (user, { rejectWithValue }) => {
  const { email, password } = user;
  try {
    // configure header's Content-Type as JSON
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${SERVER_URL}/api/user/login`,
      { email, password },
      {
        ...config,
        withCredentials: true // Required for cookies to be sent with request
      }
    );
    
    // Don't need to handle token storage manually anymore since we're using cookies
    if (data && data.id) {
      return data;
    } else {
      return rejectWithValue({ message: "Invalid response from server" });
    }
  } catch (error: any) {
    return rejectWithValue({
      message: getErrorMessage(error)
    });
  }
});
