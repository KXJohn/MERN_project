import express from "express";
import { check } from "express-validator";
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

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  createPlace,
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  updatePlace,
);

router.delete("/:pid", deletePlaceById);

export default router;
