import express, { Express, Request, Response } from "express";

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const placeToReturn = DUMMY_PLACES.find((place) => place.id === placeId);

  if (placeToReturn == null) {
    throw new Error("No Place To Return");
  } else {
    res.json({ place: placeToReturn });
  }
});

router.get("/user/:id", (req, res, next) => {
  const userId = req.params.id;
  console.log("userId", userId);
  const place = DUMMY_PLACES.find((place) => place.creator === userId);

  if (place == null) {
    throw new Error("No Place To Return");
  } else {
    res.json({ place });
  }
});

export default router;
