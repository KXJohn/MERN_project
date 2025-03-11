import { FC } from "react";
import { useParams } from "react-router-dom";
import { DUMMY_PLACES } from "@/places/mockData.ts";
import { NewPlace } from "@/places/pages/NewPlace.tsx";

export const UpdatePlace: FC = () => {
  const { placeId } = useParams();
  const identifiedPlace = DUMMY_PLACES.find((d) => d.id === placeId);

  if (identifiedPlace == null) {
    return (
      <div className="center">
        <h2>Could Not Find The Place</h2>
      </div>
    );
  }

  return <NewPlace place={identifiedPlace} />;
};
