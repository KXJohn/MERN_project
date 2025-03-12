import { Link } from "react-router-dom";

import "./style.css";
import { FC, ReactNode } from "react";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  to?: string;
  inverse?: boolean;
  danger?: boolean;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

export const Button: FC<ButtonProps> = ({
  href,
  type,
  inverse,
  disabled,
  onClick,
  danger,
  children,
  to,
  size,
}) => {
  if (href) {
    return (
      <a
        className={`button button--${size || "default"} ${
          inverse && "button--inverse"
        } ${danger && "button--danger"}`}
        href={href}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link
        to={to}
        className={`button button--${size || "default"} ${
          inverse && "button--inverse"
        } ${danger && "button--danger"}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${size || "default"} ${
        inverse && "button--inverse"
      } ${danger && "button--danger"}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
