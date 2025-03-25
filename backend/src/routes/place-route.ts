import express, { Express, Request, Response } from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("GET Request");

  res.json({ message: "Get Request" });
});

export default router;
