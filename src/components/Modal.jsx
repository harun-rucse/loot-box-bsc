import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { usePreSale } from "../context/PreSaleContext";

const ModalContext = createContext();

function ModalOpen({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function ModalBody({ children, name, className }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 bg-gray-900/70 flex items-center backdrop-blur justify-center z-[99999]">
      <div
        ref={ref}
        className={`flex flex-col gap-4 bg-white rounded-2xl w-[22rem] md:min-w-[36rem] overflow-y-auto md:min-h-[28rem] md:overflow-hidden ${className}`}
      >
        {children}
      </div>
    </div>,
    document.getElementById("portal-root")
  );
}

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const { setShowPurchase } = usePreSale();

  const close = () => {
    setOpenName("");
    setShowPurchase(false);
  };
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.Body = ModalBody;
Modal.Open = ModalOpen;

export default Modal;
