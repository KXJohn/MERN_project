import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HttpError } from "../models/http-errors";
import { getCoordinatesForLocation } from "../utilities/location";
import PlaceModel, { Place, Location } from "../models/place";

export const getPlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const placeId = req.params.pid;

  let placeToReturn;
  try {
    placeToReturn = await PlaceModel.findById(placeId);
  } catch (e) {
    const error = new HttpError(
      500,
      `Something went wrong, Could not find a place ${e}`,
    );

    return next(error);
  }

  if (placeToReturn == null) {
    throw new Error("No Place To Return");
  } else {
    res.json({ place: placeToReturn.toObject({ getters: true }) });
  }
};

export const getPlaceByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id;
  let placeToReturn = [];

  try {
    placeToReturn = await PlaceModel.find({ creator: userId });
  } catch (e) {
    const error = new HttpError(
      500,
      `Something went wrong, Could not find a place ${e}`,
    );

    return next(error);
  }

  if (placeToReturn == null || placeToReturn.length === 0) {
    throw new Error("No Place To Return");
  } else {
    res.json({ placeToReturn });
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

export const updatePlace = async (
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
  let updatedPlace = undefined;

  try {
    updatedPlace = await PlaceModel.findById(pid);
  } catch (e) {
    throw new HttpError(500, "Something went wrong, Could not update a place");
  }

  if (updatedPlace != null) {
    updatedPlace.description = description;
    updatedPlace.title = title;
    try {
      await updatedPlace.save();
    } catch (err) {
      const error = new HttpError(500, "Update Place Error");
      return next(error);
    }
  }

  res.status(200).json({ place: updatedPlace?.toObject({ getters: true }) });
};

export const deletePlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { pid } = req.params;
  let place = undefined;

  try {
    place = await PlaceModel.findById(pid);
  } catch (e) {
    throw new HttpError(422, "Could not delete non-exist Place");
  }

  if (place != null) {
    try {
      await place.deleteOne();
    } catch (e) {
      const error = new HttpError(500, "Could not delete place");
      return next(error);
    }
  }

  res.status(200).json({ message: "Deleted Place" });
};
