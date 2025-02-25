import { FC, Fragment, useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { MainHeader } from "./MainHeader.tsx";
import { NavLinks } from "./NavLinks.tsx";
import { SideDrawer } from "./SideDrawer.tsx";
import { Backdrop } from "../UIElements/BackDrop.tsx";

export const MainNavigation: FC = () => {
  const [showDrawerNav, setShowDrawerNav] = useState(false);

  const closeDrawer = useCallback(() => {
    setShowDrawerNav(false);
  }, []);

  return (
    <Fragment>
      {showDrawerNav ? <Backdrop onClick={closeDrawer} /> : null}
      {showDrawerNav ? (
        <SideDrawer>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      ) : null}
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => setShowDrawerNav(!showDrawerNav)}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </Fragment>
  );
};
