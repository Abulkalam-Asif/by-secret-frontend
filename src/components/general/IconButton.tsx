import React, { ReactNode } from "react";

type ButtonProps = {
  icon: ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
  title?: string;
};

const Button = ({
  onClick,
  icon,
  disabled = false,
  type = "button",
  className = "",
  title = "",
}: ButtonProps) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        title={title}
        type={type}
        className={`p-1 bg-theme-blue hover:bg-theme-gray text-white font-medium shadow-sm transition duration-200 cursor-pointer rounded ${
          disabled ? "opacity-50" : ""
        } ${className}`}>
        {icon}
      </button>
    </>
  );
};

export default Button;
