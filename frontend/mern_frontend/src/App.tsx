import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { User } from "./users/pages/Users.tsx";
import { Fragment, useEffect } from "react";
import { NewPlace } from "./places/pages/NewPlace.tsx";
import { MainNavigation } from "./shared/components/Navigation/MainNavigation.tsx";
import { UserPlaces } from "./places/pages/UserPlaces.tsx";
import { UpdatePlace } from "@/places/pages/UpdatePlace.tsx";
import { AuthPage } from "@/places/pages/AuthPage.tsx";
import { ProtectedRoute } from "@/route/ProtectedRoute.tsx";
import { useAppDispatch } from "./store.ts";
import { checkAuthStatus } from "./features/auth/authActions.ts";

function App() {
  const dispatch = useAppDispatch();
  
  // Check authentication status when the app loads
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Fragment>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<User />} />
            <Route path="/:userId/places" element={<UserPlaces />}></Route>
            <Route path="/places/new" element={<NewPlace />} />
            <Route path="/places/:placeId" element={<UpdatePlace />} />
          </Route>
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;
