import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LogInFormValue } from "@/places/types.ts";

const backEndURL = "http://127.0.0.1:5000";

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
        `${backEndURL}/auth/register`,
        { name, email, password },
        config,
      );
    } catch (error: unknown) {
      return rejectWithValue(error as Error);
    }
  },
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (logInInfo: LogInFormValue, { rejectWithValue }) => {
    const { email, password } = logInInfo;
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
      return rejectWithValue(error as Error);
    }
  },
);
