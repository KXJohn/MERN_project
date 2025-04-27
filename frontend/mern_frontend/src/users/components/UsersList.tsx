import { FC } from "react";
import { UserListItem } from "./UserListItem.tsx";
import { UserListContainer } from "./style.ts";
import { Card } from "@/shared/components/UIElements/Card.tsx";
import { UserData } from "@/features/auth/authActions.ts";

interface UsersListProps {
  users: ReadonlyArray<UserData>;
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
        {users.map((d) => {
          return (
            <UserListItem
              key={d.id}
              email={d.email}
              imageUrl={d.imageUrl}
              id={d.id}
              name={d.name}
              placeCount={d.placeCount}
            />
          );
        })}
      </ul>
    </UserListContainer>
  );
};
