import { Schema, model } from "mongoose";

export interface Location {
  lat: number;
  lng: number;
}

export interface Place {
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  address?: string;
  location?: Location;
  creator?: string;
}

const placeSchema = new Schema<Place>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: String, required: true },
});

const PlaceModel = model("Place", placeSchema);
export default PlaceModel;
