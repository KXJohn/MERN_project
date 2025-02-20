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
      <ul>
        {users.map((d) => (
          <UserListItem key={d.id} />
        ))}
      </ul>
    </div>
  );
};
