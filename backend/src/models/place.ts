import mongoose, { Schema, model, Document } from "mongoose";
import { UserDocument } from "./user";

export interface Location {
  lat: number;
  lng: number;
}

interface Place {
  title: string;
  description: string;
  imageUrl: string;
  address: string;
  location: Location;
  creator: UserDocument;
}

const placeSchema: Schema = new Schema<Place>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

type PlaceDocument = Place & Document;
const PlaceModel = model<PlaceDocument>("Place", placeSchema);
export { Place, PlaceDocument, PlaceModel };
