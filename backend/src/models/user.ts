import mongoose, { Schema, model, InferSchemaType, Document } from "mongoose";

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  imageUrl: { type: String },
  place: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
});

type User = InferSchemaType<typeof userSchema>;
type UserDocument = Document & User;
const UserModel = model<UserDocument>("User", userSchema);
export { User, UserDocument, UserModel };
