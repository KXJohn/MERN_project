import styled from "styled-components";
import { memo } from "react";

const SpinnerContainer = styled.div`
  .spinner {
    padding: 0.1rem 0;
  }

  .spinner-circle {
    height: 100%;
    background: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    padding: 0.5rem 1rem;
  }

  .spinner-circle:before {
    z-index: 5;
    content: "";
    position: absolute;
    border-radius: 50%;
    border: 3px dashed #fff;
    width: 25px;
    height: 25px;
    border-left: 3px solid transparent;
    border-bottom: 3px solid transparent;
    animation: loading 1s linear infinite;
  }

  .spinner-circle:after {
    content: "";
    position: absolute;
    border-radius: 50%;
    border: 3px dashed #fff;
    width: 25px;
    height: 25px;
    border-left: 3px solid transparent;
    border-bottom: 3px solid transparent;
    animation: loading 1s ease infinite;
    z-index: 10;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner = memo(() => (
  <SpinnerContainer>
    <div className="spinner" aria-label="spinner-icon">
      <div className="spinner-circle"></div>
    </div>
  </SpinnerContainer>
));
