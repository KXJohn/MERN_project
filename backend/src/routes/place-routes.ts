import express, { Express, Request, Response } from "express";
import {
  createPlace,
  deletePlaceById,
  getPlaceById,
  getPlaceByUserId,
  updatePlace,
} from "../controllers/places-controller";

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:id", getPlaceByUserId);

router.post("/", createPlace);

router.patch("/:pid", updatePlace);

router.delete("/:pid", deletePlaceById);

export default router;
