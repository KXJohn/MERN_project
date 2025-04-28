import { FC } from "react";
import { ReactNode, CSSProperties } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  position: relative;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  padding: 0;
  overflow: hidden;
`;

interface Props {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export const Card: FC<Props> = ({ className, style, children }) => {
  return (
    <CardContainer className={`card ${className}`} style={style}>
      {children}
    </CardContainer>
  );
};
