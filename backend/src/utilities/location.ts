import axios from "axios";
import { HttpError } from "../models/http-errors";
import { Location } from "../models/place";

export async function getCoordinatesForLocation(
  address: string,
): Promise<Location | undefined> {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.API_KEY}`,
  );

  const data = response.data;
  if (data == null || data.status === "ZERO_RESULTS") {
    throw new HttpError(
      422,
      "Could not get coordinates from the specified address",
    );
  }

  return data.results[0].geometry.location;
}
