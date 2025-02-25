import { FC } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const BackDropContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;

interface Props {
  onClick: () => void;
}

export const Backdrop: FC<Props> = ({ onClick }) => {
  return createPortal(
    <BackDropContainer
      className="backdrop"
      onClick={onClick}
    ></BackDropContainer>,
    document.getElementById("backdrop-hook") as HTMLElement,
  );
};
