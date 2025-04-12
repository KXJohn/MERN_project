import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { HttpError } from "../models/http-errors";
import { validationResult } from "express-validator";
import UserSchema from "../models/user";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

const DUMMY_USERS: Array<User> = [
  {
    id: "1",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "secureP@ss123",
  },
];

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  res.json({ users: DUMMY_USERS });
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

  const { name, email, password, imageUrl, place } = req.body;

  let existingUser = undefined;
  try {
    existingUser = await UserSchema.findOne({ email });
  } catch (error) {
    const err = new HttpError(500, `${error}`);
    return next(err);
  }

  if (existingUser != null) {
    const err = new HttpError(422, "User already exists");
    return next(err);
  }

  const createdUser = new UserSchema({
    name,
    email,
    imageUrl,
    password,
    place,
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
    existingUser = await UserSchema.findOne({ email });
  } catch (error) {
    const err = new HttpError(500, `${error}`);
    return next(err);
  }

  if (existingUser == null || existingUser.password !== password) {
    const err = new HttpError(422, "Invalid Credentials, could not log you in");
    return next(err);
  }

  res.json({ message: "logged in" });
};
