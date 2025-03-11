import { FC } from "react";
import { PlaceList } from "@/places/components/PlaceList.tsx";
import { useParams } from "react-router-dom";
import { DUMMY_PLACES } from "@/places/mockData.ts";

export const UserPlaces: FC = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((d) => d.creator === userId);
  return <PlaceList places={loadedPlaces} />;
};
