import { FC, Fragment, useCallback, useRef } from "react";
import { Place } from "../types.ts";
import styled from "styled-components";
import { Card } from "@/shared/components/UIElements/Card.tsx";
import { Button } from "@/shared/components/FormElements/Button.tsx";
import { Modal } from "@/shared/components/UIElements/Modal.tsx";
import { MapDisplay } from "@/shared/components/UIElements/Map.tsx";
import { ModalButtonRow } from "@/shared/components/UIElements/ModalButtonRow.tsx";
import { useToggle } from "@/shared/hooks/useToggle.ts";

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
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    border-top: 1px solid #ccc;
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
  const [showMap, toggleShowMap] = useToggle(false);
  const [showConfirmModal, toggleShowConfirmModal] = useToggle(false);

  const ref = useRef(null);
  const footer = <Button onClick={toggleShowMap}>Close</Button>;

  const confirmDeleteHandler = useCallback(() => {
    console.log("Deleting....");
  }, []);

  return (
    <PlaceItemContainer>
      <Fragment>
        {showMap && (
          <Modal
            ref={ref}
            show={showMap}
            onCancel={toggleShowMap}
            header={place.address}
            contentClassName="place-item__modal-content"
            footerClassName="place-item__modal-actions"
            footer={footer}
          >
            <div className="map-container">
              <MapDisplay center={place.location} zoom={16} />
            </div>
          </Modal>
        )}
        {showConfirmModal && (
          <Modal
            show={showConfirmModal}
            onCancel={toggleShowConfirmModal}
            ref={ref}
            header="Are you sure?"
          >
            <p>Do you want to proceed and delete this place?</p>
            <ModalButtonRow
              firstButtonText="Cancel"
              secondButtonText="Delete"
              onClickFirstButton={toggleShowConfirmModal}
              onClickSecondButton={confirmDeleteHandler}
            />
          </Modal>
        )}
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
            <ModalButtonRow
              firstButtonText="View on Map"
              secondButtonText="Delete"
              onClickFirstButton={toggleShowMap}
              onClickSecondButton={toggleShowConfirmModal}
            >
              <Button to={`/places/${place.id}`}>Edit</Button>
            </ModalButtonRow>
          </Card>
        </li>
      </Fragment>
    </PlaceItemContainer>
  );
};
