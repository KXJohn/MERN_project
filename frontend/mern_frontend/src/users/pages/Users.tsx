import { FC } from "react";
import { Users } from "../components/types.ts";
import { UsersList } from "../components/UsersList.tsx";

export const User: FC = () => {
  const users: ReadonlyArray<Users> = [
    { id: "u1", name: "test user", imageUrl: "" },
  ];

  return <UsersList users={users} />;
};
