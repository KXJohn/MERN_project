import { FC } from "react";
import styled from "styled-components";

const AvatarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    display: block;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

interface Props {
  className?: string;
  image?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export const Avatar: FC<Props> = ({ className, height, alt, width, image }) => {
  return (
    <AvatarContainer className={`avatar ${className ?? ""}`}>
      <img src={image} alt={alt} style={{ width: width, height: height }} />
    </AvatarContainer>
  );
};
