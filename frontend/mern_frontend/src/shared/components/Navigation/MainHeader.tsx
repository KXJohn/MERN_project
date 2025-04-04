import { FC, ReactNode } from "react";

import styled from "styled-components";

const HeaderContainer = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: #ff0055;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.26);
  padding: 0 1rem;
  z-index: 5;

  main {
    margin-top: 5rem;
  }

  @media (min-width: 768px) {
    & {
      justify-content: space-between;
    }
  }

  .main-navigation__menu-btn {
    width: 3rem;
    height: 3rem;
    background: transparent;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-right: 2rem;
    cursor: pointer;
  }

  .main-navigation__menu-btn span {
    display: block;
    width: 3rem;
    height: 3px;
    background: white;
  }

  .main-navigation__title {
    color: white;
  }

  .main-navigation__title a {
    text-decoration: none;
    color: white;
  }

  .main-navigation__header-nav {
    display: none;
  }

  .main-navigation__drawer-nav {
    height: 100%;
  }

  @media (min-width: 768px) {
    .main-navigation__menu-btn {
      display: none;
    }

    .main-navigation__header-nav {
      display: block;
      margin-right: 20px;
    }
  }
`;

export const MainHeader: FC<{ children: ReactNode }> = ({ children }) => {
  return <HeaderContainer className="main-header">{children}</HeaderContainer>;
};
