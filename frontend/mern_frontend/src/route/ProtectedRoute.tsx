import { FC } from "react";

import { useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";
import { RootState } from "@/store.ts";

export const ProtectedRoute: FC = () => {
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const isLoggedIn = user.length > 0;

  if (!isLoggedIn) {
    return (
      <div className="unauthorized">
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to="/auth">Login</NavLink> to gain access
        </span>
      </div>
    );
  }

  // returns child route elements
  return <Outlet />;
};
