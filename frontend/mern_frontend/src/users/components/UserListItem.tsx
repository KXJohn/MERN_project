import { FC } from "react";
import { Users } from "./types.ts";
import { UserItemContainer } from "./style.ts";
import { Avatar } from "@/shared/components/UIElements/Avatar.tsx";
import { Link } from "react-router-dom";
import { Card } from "@/shared/components/UIElements/Card.tsx";

export const UserListItem: FC<Users> = ({ id, name, imageUrl, placeCount }) => {
  return (
    <UserItemContainer className="user-item">
      <div className="user-item-content">
        <Card>
          <Link to={`/${id}/places`}>
            <div className="user-image">
              <Avatar image={imageUrl} alt={name} />
            </div>
            <div className="user-info">
              <h2>{name}</h2>
              <h3>
                {placeCount} {placeCount === 1 ? "Place" : "Places"}
              </h3>
            </div>
          </Link>
        </Card>
      </div>
    </UserItemContainer>
  );
};
