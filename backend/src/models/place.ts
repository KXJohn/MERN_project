import mongoose, { Schema, model, Document, InferSchemaType } from "mongoose";

export interface Location {
  lat: number;
  lng: number;
}

const placeSchema = new Schema({
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

type Place = InferSchemaType<typeof placeSchema>;
type PlaceDocument = Place & Document;
const PlaceModel = model<PlaceDocument>("Place", placeSchema);
export { Place, PlaceDocument, PlaceModel };
