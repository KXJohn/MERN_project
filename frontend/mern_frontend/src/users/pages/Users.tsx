import { FC, useEffect } from "react";
import { UsersList } from "@/users/components/UsersList.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store.ts";
import { useGetUserDetailsQuery } from "@/features/auth/authService.ts";
import { setCredentials } from "@/features/auth/authSlice.ts";

export const User: FC = () => {
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
  }, [data, dispatch]);
  console.log("userInfo", userInfo);
  return (
    <div>
      <UsersList users={[userInfo]} />
    </div>
  );
};
