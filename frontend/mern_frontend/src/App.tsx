import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { User } from "./users/pages/Users.tsx";
import { Fragment } from "react";
import { NewPlace } from "./places/pages/NewPlace.tsx";
import { MainNavigation } from "./shared/components/Navigation/MainNavigation.tsx";
import { UserPlaces } from "./places/pages/UserPlaces.tsx";

function App() {
  return (
    <Fragment>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/:userId/places" element={<UserPlaces />}></Route>
          <Route path="/places/new" element={<NewPlace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;
