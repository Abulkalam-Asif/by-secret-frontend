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
        className={`mb-5 bg-[#fafafa] py-4 px-8 rounded-l-2xl shadow-md border border-[#e6e6e6] w-full mx-auto flex items-center gap-4 ${
          isVisible ? "animate-enter" : "opacity-0"
        }`}>
        {type === "success" ? (
          <FaCheck className="text-2xl rounded-full p-1 border-2 border-[#00c800] text-[#00c800]" />
        ) : type === "error" ? (
          <FaX className="text-2xl rounded-full p-1 border-2 border-[#c80000] text-[#c80000]" />
        ) : type === "warning" ? (
          <FaExclamation className="text-2xl rounded-full p-1 border-2 border-[#c8c800] text-[#c8c800]" />
        ) : null}
        <div>{message}</div>
      </div>
    </>
  );
};

export default Alert;
