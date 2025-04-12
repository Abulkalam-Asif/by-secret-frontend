import React from "react";
import IconButton from "./IconButton";
import { FaX } from "react-icons/fa6";

type ModalProps = {
  children: React.ReactNode;
  closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Modal = ({ children, closeModal }: ModalProps) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-lg">
        <div className="relative bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
          <IconButton
            icon={<FaX />}
            onClick={closeModal}
            className="absolute right-2 top-2"
          />
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
