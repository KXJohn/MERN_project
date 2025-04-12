import { Schema, model } from "mongoose";

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  imageUrl: { type: String },
  place: { type: String },
});

const UserModel = model("User", userSchema);
export default UserModel;
