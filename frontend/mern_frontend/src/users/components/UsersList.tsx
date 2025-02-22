import { FC } from "react";
import { Users } from "./types.ts";
import { UserListItem } from "./UserListItem.tsx";

interface UsersListProps {
  users: ReadonlyArray<Users>;
}

export const UsersList: FC<UsersListProps> = ({ users }) => {
  if (users.length === 0) {
    return <div />;
  }

  return (
    <div>
      <ul className="users-list">
        {users.map((d) => (
          <UserListItem
            key={d.id}
            imageUrl={d.imageUrl}
            id={d.id}
            name={d.name}
            placeCount={d.placeCount}
          />
        ))}
      </ul>
    </div>
  );
};
