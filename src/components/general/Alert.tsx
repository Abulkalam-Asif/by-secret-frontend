import { FaCheck, FaExclamation } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useEffect, useState } from "react";

type AlertProps = {
  type: string;
  message: string;
};

const Alert = ({ type, message }: AlertProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <div
        className={`py-4 px-8 rounded-l shadow-md w-full max-w-2xl mx-auto flex items-center gap-4 ${
          isVisible ? "animate-enter" : "opacity-0"
        } ${
          type === "success"
            ? "text-green-600 bg-green-100"
            : type === "error"
            ? "text-red-600 bg-red-100"
            : type === "warning"
            ? "text-yellow-600 bg-yellow-100"
            : ""
        }`}>
        {type === "success" ? (
          <FaCheck className="text-2xl rounded-full p-1 border-2 border-green-600 text-green-600" />
        ) : type === "error" ? (
          <FaX className="text-2xl rounded-full p-1 border-2 border-red-600 text-red-600" />
        ) : type === "warning" ? (
          <FaExclamation className="text-2xl rounded-full p-1 border-2 border-yellow-600 text-yellow-600" />
        ) : null}
        <p className="flex-1">{message}</p>
      </div>
    </>
  );
};

export default Alert;
