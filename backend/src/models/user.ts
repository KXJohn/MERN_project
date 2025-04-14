import mongoose, { Schema, model, Document, Types } from "mongoose";

interface User {
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
  places: Types.Array<Types.ObjectId>;
}
type UserDocument = Document & User;

const userSchema: Schema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  imageUrl: { type: String },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
});

const UserModel = model<UserDocument>("User", userSchema);
export { User, UserDocument, UserModel };
