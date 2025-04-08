import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HttpError } from "../models/http-errors";
import { getCoordinatesForLocation } from "../utilities/location";
import PlaceModel from "../models/place";

export interface Location {
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

let DUMMY_PLACES: Array<Place> = [
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
  const places = DUMMY_PLACES.filter((place) => place.creator === userId);

  if (places == null || places.length === 0) {
    throw new Error("No Place To Return");
  } else {
    res.json({ places });
  }
};

export const createPlace = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, location, address, creator, imageUrl } = req.body;

  let coordinates: Location | undefined = undefined;
  let newPlace: Place | undefined = undefined;

  try {
    coordinates = await getCoordinatesForLocation(address);
    if (coordinates != null) {
      newPlace = {
        title,
        address,
        description,
        creator,
        location: location == null ? coordinates : location,
        imageUrl,
      };
    }
  } catch (error) {
    return next(error);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError(422, "Invalid Place"));
  }

  if (newPlace != undefined) {
    const createdPlace = new PlaceModel({
      title: newPlace.title,
      description: newPlace.description,
      location: newPlace.location,
      imageUrl: newPlace.imageUrl,
      address: newPlace.address,
      creator: newPlace.creator,
    });

    try {
      createdPlace.save();
      res.status(201).json({ place: createdPlace });
    } catch (error) {
      throw new HttpError(500, "Create Place Error");
    }
  }
};

export const updatePlace = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(422, "Invalid Input");
  }

  const { title, description } = req.body;

  const { pid } = req.params;
  const updatedPlace = { ...DUMMY_PLACES.find((place) => place.id === pid) };
  const placeIndex = DUMMY_PLACES.findIndex(
    (place) => place.id === updatedPlace.id,
  );
  updatedPlace.description = description;
  updatedPlace.title = title;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

export const deletePlaceById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { pid } = req.params;
  if (!DUMMY_PLACES.find((place) => place.id === pid)) {
    throw new HttpError(422, "Could not delete non-exist Place");
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((d) => d.id !== pid);

  res.status(200).json({ message: "Deleted Place" });
};
