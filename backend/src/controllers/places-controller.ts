import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";

interface Location {
  lat: number;
  lng: number;
}

interface Place {
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  address?: string;
  location?: Location;
  creator?: string;
}

const DUMMY_PLACES: Array<Place> = [
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

export const getPlaceById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const placeId = req.params.pid;
  const placeToReturn = DUMMY_PLACES.find((place) => place.id === placeId);

  if (placeToReturn == null) {
    throw new Error("No Place To Return");
  } else {
    res.json({ place: placeToReturn });
  }
};

export const getPlaceByUserId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id;
  console.log("userId", userId);
  const place = DUMMY_PLACES.find((place) => place.creator === userId);

  if (place == null) {
    throw new Error("No Place To Return");
  } else {
    res.json({ place });
  }
};

export const createPlace = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, location, address, creator, imageUrl } = req.body;

  const newPlace: Place = {
    id: uuid(),
    title,
    address,
    description,
    creator,
    location,
    imageUrl,
  };

  DUMMY_PLACES.push(newPlace);

  res.status(201).json({ place: newPlace });
};
