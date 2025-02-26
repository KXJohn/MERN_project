import { FC } from "react";
import { Place } from "../types.ts";
import styled from "styled-components";
import { Card } from "../../shared/components/UIElements/Card.tsx";

const PlaceItemContainer = styled.div`
  .place-item {
    margin: 1rem 0;
  }

  .place-item__content {
    padding: 0;
  }

  .place-item__info {
    padding: 1rem;
    text-align: center;
  }

  .place-item__image {
    width: 100%;
    height: 12.5rem;
    margin-right: 1.5rem;
  }

  .place-item__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .place-item__info h2,
  .place-item__info h3,
  .place-item__info p {
    margin: 0 0 0.5rem 0;
  }

  .place-item__actions {
    padding: 1rem;
    text-align: center;
    border-top: 1px solid #ccc;
  }

  .place-item__modal-content {
    padding: 0;
  }

  .place-item__modal-actions {
    text-align: right;
  }

  .place-item__actions button,
  .place-item__actions a {
    margin: 0.5rem;
  }

  @media (min-width: 768px) {
    .place-item__image {
      height: 20rem;
    }
  }
`;

interface Props {
  place: Place;
}

export const PlaceItem: FC<Props> = ({ place }) => {
  return (
    <PlaceItemContainer>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={place.imageUrl} alt={place.title} />
          </div>
          <div className="place-item__info">
            <h2>{place.title}</h2>
            <h3>{place.address}</h3>
            <p>{place.address}</p>
          </div>
          <div className="place-item__modal-actions">
            <button>View on Map</button>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </Card>
      </li>
    </PlaceItemContainer>
  );
};
