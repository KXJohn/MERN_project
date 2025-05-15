import { FC, useEffect } from "react";
import { UsersList } from "@/users/components/UsersList.tsx";
import { useDispatch } from "react-redux";
import { useGetUserDetailsQuery } from "@/features/auth/authService.ts";
import { setCredentials } from "@/features/auth/authSlice.ts";
import { Spinner } from "@/shared/components/UIElements/Spinner.tsx";

export const User: FC = () => {
  const dispatch = useDispatch();
  const { data, isFetching, isError } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15 mins
    pollingInterval: 900000,
  });
  
  useEffect(() => {
    if (data && data.users) {
      dispatch(setCredentials(data.users));
    }
  }, [data, dispatch]);
  
  if (isError) {
    return <div>Error loading users. Please try again later.</div>;
  }
  
  return (
    <div>
      {isFetching ? (
        <Spinner />
      ) : (
        data && data.users ? <UsersList users={data.users} /> : <div>No users found</div>
      )}
    </div>
  );
};
