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
      return rejectWithValue(error);
    }
  },
);
