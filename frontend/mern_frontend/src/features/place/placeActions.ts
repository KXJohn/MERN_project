import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewPlaceFormValue } from "@/places/types.ts";
import { SERVER_URL } from "@/constants.ts";

export const addNewPlace = createAsyncThunk(
  "place/createPlace",
  async (newPlace: NewPlaceFormValue, { rejectWithValue }) => {
    const { title, lat, lng, address, imageUrl, description } = newPlace;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${SERVER_URL}/api/places/create`,
        {
          title,
          address,
          imageUrl,
          description,
          location: { lat, lng },
        },
        config,
      );
    } catch (error: unknown) {
      return rejectWithValue(error as Error);
    }
  },
);
