import { NextFunction, Request, Response } from "express";
import { HttpError } from "../models/http-errors";
import { validationResult } from "express-validator";
import { UserModel, UserDocument } from "../models/user";

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

  const { name, email, password, imageUrl, place } = req.body;

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

  const createdUser = new UserModel({
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
    existingUser = await UserModel.findOne({ email });
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
