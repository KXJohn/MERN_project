import mongoose, { Schema, model, Document } from "mongoose";
import { Place } from "./place";

interface User {
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
  places: Array<Place>;
}

const userSchema: Schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  imageUrl: { type: String },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
});

type UserDocument = Document & User;
const UserModel = model<UserDocument>("User", userSchema);
export { User, UserDocument, UserModel };
