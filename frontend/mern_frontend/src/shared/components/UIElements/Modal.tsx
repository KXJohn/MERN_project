import React, { FC, Fragment, ReactNode } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { Backdrop } from "./BackDrop.tsx";

const ModalContainer = styled.div`
  z-index: 100;
  position: fixed;
  top: 22vh;
  left: 10%;
  width: 80%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 8px;

  .modal__header {
    width: 100%;
    padding: 1rem 0;
    background: #2a006e;
    color: white;
  }

  .modal__header h2 {
    margin: 0.5rem;
  }

  .modal__content {
    padding: 1rem 0.5rem;
  }

  .modal__footer {
    padding: 1rem 0.5rem;
  }

  .map-container {
    width: 100%;
    height: 20rem;
  }

  @media (min-width: 768px) {
    left: calc(50% - 20rem);
    width: 40rem;
  }

  .modal-enter {
    transform: translateY(-10rem);
    opacity: 0;
  }

  .modal-enter-active {
    transform: translateY(0);
    opacity: 1;
    transition: all 200ms;
  }

  .modal-exit {
    transform: translateY(0);
    opacity: 1;
  }

  .modal-exit-active {
    transform: translateY(-10rem);
    opacity: 0;
    transition: all 200ms;
  }
`;

interface ModalOverlayProps {
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  style?: React.CSSProperties;
  header: string;
  onSubmit?: () => void;
  children?: ReactNode;
  footer?: ReactNode;
}

const ModalOverlay: FC<ModalOverlayProps> = ({
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  style,
  header,
  onSubmit,
  children,
  footer,
}) => {
  const content = (
    <ModalContainer className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClassName}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
        <div className={`modal__content ${contentClassName}`}>{children}</div>
        <footer className={`modal__footer ${footerClassName}`}>{footer}</footer>
      </form>
    </ModalContainer>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("modal-hook") as HTMLElement,
  );
};

interface ModalProps extends ModalOverlayProps {
  show: boolean;
  onCancel: () => void;
}

export const Modal: FC<ModalProps> = ({
  show,
  onCancel,
  header,
  onSubmit,
  children,
  footer,
  headerClassName,
  contentClassName,
  footerClassName,
  style,
  className,
}) => {
  return (
    <Fragment>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay
          header={header}
          style={style}
          className={className}
          contentClassName={contentClassName}
          footerClassName={footerClassName}
          headerClassName={headerClassName}
          footer={footer}
          children={children}
          onSubmit={onSubmit}
        />
      </CSSTransition>
    </Fragment>
  );
};
