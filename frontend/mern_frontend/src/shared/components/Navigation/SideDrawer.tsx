import { FC, ReactNode } from "react";

import styled from "styled-components";
import { createPortal } from "react-dom";

const StyledAsideDrawer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  height: 100vh;
  width: 70%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
`;

interface OwnProps {
  children: ReactNode;
}

export const SideDrawer: FC<OwnProps> = ({ children }) => {
  const content = (
    <StyledAsideDrawer className="side-drawer">{children}</StyledAsideDrawer>
  );
  return createPortal(
    content,
    document.getElementById("drawer-root") as Element,
  );
};
