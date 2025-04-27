import { FC, useEffect } from "react";
import { UsersList } from "@/users/components/UsersList.tsx";
import { useDispatch } from "react-redux";
import { useGetUserDetailsQuery } from "@/features/auth/authService.ts";
import { setCredentials } from "@/features/auth/authSlice.ts";

export const User: FC = () => {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15 mins
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data != null) {
      dispatch(setCredentials(data.users));
    }
  }, [data, dispatch]);
  return (
    <div>
      {isFetching ? (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt="loading"
        />
      ) : (
        <UsersList users={data.users} />
      )}
    </div>
  );
};
