import { getUsers, login, signup } from "../controllers/users-controller";
import express from "express";
import { check } from "express-validator";
import { verifyToken, RequestWithUserId } from "../middleware/auth";
import { UserModel } from "../models/user";

const router = express.Router();

// Public routes
router.get("/", getUsers);
router.post("/login", login);
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  signup,
);

// Logout route
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// Protected route to get current user information
router.get("/profile", verifyToken, async (req: RequestWithUserId, res, next) => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }
    
    const user = await UserModel.findById(req.userId, "-password"); // Exclude password
    
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
      places: user.places
    });
  } catch (error) {
    next(error);
  }
});

export default router;
