import { FC } from "react";
import { Users } from "./types.ts";

export const UserListItem: FC<Users> = ({ name, imageUrl, placeCount }) => {
  return (
    <li className="users-item">
      <div className="user-item-content">
        <div className="user-image">
          <img src={imageUrl} alt={name} />
        </div>
        <div className="user-info">
          <h2>{name}</h2>
          <h3>
            {placeCount} {placeCount === 1 ? "Place" : "Places"}
          </h3>
        </div>
      </div>
    </li>
  );
};
