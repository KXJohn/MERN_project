import { FC } from "react";
import { UserData } from "@/features/auth/authActions.ts";
import { UserItemContainer } from "./style.ts";
import { Avatar } from "@/shared/components/UIElements/Avatar.tsx";
import { Link } from "react-router-dom";
import { Card } from "@/shared/components/UIElements/Card.tsx";
import { stringIsNotNullOrWhiteSpace } from "@/shared/utilities.ts";
import { DEFAULT_USER_AVATAR_URL } from "@/constants.ts";

export const UserListItem: FC<UserData> = ({
  id,
  name,
  imageUrl,
  placeCount,
}) => {
  console.log("name", name);
  return (
    <UserItemContainer className="user-item">
      <div className="user-item-content">
        <Card>
          <Link to={`/${id}/places`}>
            <div className="user-image">
              <Avatar
                image={
                  stringIsNotNullOrWhiteSpace(imageUrl)
                    ? imageUrl
                    : DEFAULT_USER_AVATAR_URL
                }
                alt={name}
              />
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
