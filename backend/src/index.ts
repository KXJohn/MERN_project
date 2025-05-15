import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import placeRoutes from "./routes/place-routes";
import { errorHandler } from "./middleware/errors";
import usersRoutes from "./routes/users-routes";
import mongoose from "mongoose";
import * as process from "node:process";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Required for cookies
  }),
);

app.use("/api/places", placeRoutes);
app.use("/api/user", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI ?? "")
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
