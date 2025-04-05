import { getUsers, login, signup } from "../controllers/users-controller";
import express from "express";

const router = express.Router();

router.get("/", getUsers);

router.post("/login", login);

router.post("/signup", signup);

export default router;
