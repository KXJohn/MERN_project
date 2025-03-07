import { FC } from "react";
import { Users } from "./types.ts";
import { UserListItem } from "./UserListItem.tsx";
import { UserListContainer } from "./style.ts";
import { Card } from "@/shared/components/UIElements/Card.tsx";

interface UsersListProps {
  users: ReadonlyArray<Users>;
}

export const UsersList: FC<UsersListProps> = ({ users }) => {
  if (users.length === 0) {
    return (
      <div>
        <Card>
          <h2>No User Found</h2>
        </Card>
      </div>
    );
  }

  return (
    <UserListContainer>
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
    </UserListContainer>
  );
};
