import { FC, useEffect } from "react";
import { Users } from "@/users/components/types.ts";
import { UsersList } from "@/users/components/UsersList.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store.ts";
import { useGetUserDetailsQuery } from "@/features/auth/authService.ts";
import { setCredentials } from "@/features/auth/authSlice.ts";

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
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15mins
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data != null) {
      dispatch(setCredentials(data));
    }
  }, []);

  return (
    <div>
      <UsersList users={users} />
    </div>
  );
};
