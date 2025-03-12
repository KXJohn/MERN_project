import { FC } from "react";
import { useParams } from "react-router-dom";
import { DUMMY_PLACES } from "@/places/mockData.ts";
import { NewPlace } from "@/places/pages/NewPlace.tsx";
import { Card } from "@/shared/components/UIElements/Card.tsx";

export const UpdatePlace: FC = () => {
  const { placeId } = useParams();
  const identifiedPlace = DUMMY_PLACES.find((d) => d.id === placeId);

  if (identifiedPlace == null) {
    return (
      <div className="center">
        <Card>
          <h2>Could Not Find The Place</h2>
        </Card>
      </div>
    );
  }

  return <NewPlace place={identifiedPlace} />;
};
