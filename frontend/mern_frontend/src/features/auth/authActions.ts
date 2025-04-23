import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LogInFormValue } from "@/places/types.ts";
import { AppDispatch } from "@/store.ts";

const backEndURL = "http://localhost:3000";

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
        `${backEndURL}/api/user/signup`,
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
  token: string;
  id: string;
}

interface MyKnownError {
  errorMessage: string;
  // ...
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
      `${backEndURL}/api/user/login`,
      { email, password },
      config,
    );
    // store user's token in local storage
    localStorage.setItem("userToken", data.userToken);
    return data;
  } catch (error: unknown) {
    // return custom error message from API if any
    return rejectWithValue(error as MyKnownError);
  }
});
