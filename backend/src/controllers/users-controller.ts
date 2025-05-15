import { NextFunction, Request, Response } from "express";
import { HttpError } from "../models/http-errors";
import { validationResult } from "express-validator";
import { UserModel, UserDocument } from "../models/user";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let users: Array<UserDocument> = [];
  try {
    users = await UserModel.find({}, "-password");
  } catch (err) {
    const error = new HttpError(500, "Fetching users failed");
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(422, "Invalid Input");
  }

  const { name, email, password, imageUrl } = req.body;

  let existingUser = undefined;
  try {
    existingUser = await UserModel.findOne({ email });
  } catch (error) {
    const err = new HttpError(500, `${error}`);
    return next(err);
  }

  if (existingUser != null) {
    const err = new HttpError(422, "User already exists");
    return next(err);
  }

  const hashedPassword = await hash(password, 10);

  const createdUser = new UserModel({
    name,
    email,
    imageUrl,
    password: hashedPassword,
    place: [],
  });

  try {
    await createdUser.save();
  } catch (e) {
    const err = new HttpError(422, `${e}`);
    return next(err);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  let existingUser = undefined;
  try {
    existingUser = await UserModel.findOne({ email });
  } catch (error) {
    const err = new HttpError(500, `${error}`);
    return next(err);
  }

  if (existingUser == null) {
    const err = new HttpError(422, "User not found, please sign up first");
    return next(err);
  }

  const passwordMatch = await compare(password, existingUser.password);

  if (!passwordMatch) {
    const err = new HttpError(401, "Invalid Credentials, could not log you in");
    return next(err);
  }

  const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
  const token = sign({ userId: existingUser._id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({
    email: existingUser.email,
    name: existingUser.name,
    id: existingUser._id,
    token,
  });
};
