import express, { Express, Request, Response } from "express";
import {
  createPlace,
  getPlaceById,
  getPlaceByUserId,
} from "../controllers/places-controller";

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:id", getPlaceByUserId);

router.post("/", createPlace);

export default router;
