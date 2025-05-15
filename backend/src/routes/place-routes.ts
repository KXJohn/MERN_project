import express from "express";
import { check } from "express-validator";
import {
  createPlace,
  deletePlaceById,
  getPlaceById,
  getPlaceByUserId,
  updatePlace,
} from "../controllers/places-controller";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/:pid", getPlaceById);
router.get("/user/:id", getPlaceByUserId);

// Protected routes that require authentication
router.post(
  "/create",
  verifyToken,
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  createPlace,
);

router.patch(
  "/:pid",
  verifyToken,
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  updatePlace,
);

router.delete("/:pid", verifyToken, deletePlaceById);

export default router;
