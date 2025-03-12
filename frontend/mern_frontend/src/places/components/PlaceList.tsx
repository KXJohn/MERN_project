import { FC } from "react";
import styled from "styled-components";
import { Place } from "../types.ts";
import { Card } from "@/shared/components/UIElements/Card.tsx";
import { PlaceItem } from "./PlaceItem.tsx";
import { Button } from "@/shared/components/FormElements/Button.tsx";

const PlaceListContainer = styled.div`
  list-style: none;
  margin: 1rem auto;
  padding: 0;
  width: 90%;
  max-width: 40rem;
`;

interface Props {
  places: ReadonlyArray<Place>;
}

export const PlaceList: FC<Props> = ({ places }) => {
  if (places.length === 0) {
    return (
      <PlaceListContainer className="place-list center">
        <Card>
          <h2>No Places found. Maybe create one</h2>
          <Button to="/places/new" onClick={() => {}}>
            Share Place
          </Button>
        </Card>
      </PlaceListContainer>
    );
  }

  return (
    <PlaceListContainer className="place-list">
      <ul>
        {places.map((d) => (
          <PlaceItem key={d.id} place={d} />
        ))}
      </ul>
    </PlaceListContainer>
  );
};
