import { FC } from "react";
import { Users } from "../components/types.ts";
import { UsersList } from "../components/UsersList.tsx";

export const User: FC = () => {
  const users: ReadonlyArray<Users> = [
    {
      id: "u1",
      name: "test user",
      imageUrl:
        "https://cdn.pixabay.com/photo/2025/02/19/06/17/winter-9416919_1280.jpg",
      placeCount: 2,
    },
  ];

  return <UsersList users={users} />;
};
