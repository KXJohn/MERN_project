import { FC } from "react";

import { useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";
import { RootState } from "@/store.ts";

export const ProtectedRoute: FC = () => {
  const { isAuthenticated, userInfo } = useSelector((state: RootState) => state.auth);
  
  // Check if we have auth state (either from a successful login or from cookie validation)
  if (!isAuthenticated || !userInfo?.id) {
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
