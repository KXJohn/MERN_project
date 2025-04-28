import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LogInFormValue } from "@/places/types.ts";
import { AppDispatch } from "@/store.ts";
import { SERVER_URL } from "@/constants.ts";
import { MyKnownError } from "@/features/common.ts";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (registerInfo: LogInFormValue, { rejectWithValue }) => {
    const { name, email, password } = registerInfo;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${SERVER_URL}/api/user/signup`,
        { name, email, password },
        config,
      );
    } catch (error: unknown) {
      return rejectWithValue(error as Error);
    }
  },
);

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
      config,
    );
    // store user's token in local storage
    localStorage.setItem("userToken", data.token);
    return data;
  } catch (error: unknown) {
    // return a custom error message from API if any
    return rejectWithValue(error as MyKnownError);
  }
});
