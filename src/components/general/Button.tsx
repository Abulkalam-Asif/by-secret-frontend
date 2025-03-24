import React from "react";

type ButtonProps = {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
};

const Button = ({
  onClick,
  text,
  disabled = false,
  type = "submit",
  className = "",
}: ButtonProps) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        type={type}
        className={`w-full p-4 bg-theme-blue hover:bg-theme-gray text-white font-medium shadow-sm transition duration-200 uppercase cursor-pointer text-xs rounded ${
          disabled ? "opacity-50" : ""
        } ${className}`}>
        {text}
      </button>
    </>
  );
};

export default Button;
