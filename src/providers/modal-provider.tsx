"use client";

import { createContext, useContext, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import Modal from "@/components/modal";

interface ModalContextType {
  showModal: (title: string, message: string) => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

const PORTAL_ID = "portal-root";

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(PORTAL_ID);
    if (!element) {
      element = document.createElement("div");
      element.id = PORTAL_ID;
      document.body.appendChild(element);
    }
    setPortalElement(element);
  }, []);

  const showModal = (modalTitle: string, modalMessage: string) => {
    setTitle(modalTitle);
    setMessage(modalMessage);
    setShowPopup(true);
  };

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      {showPopup &&
        portalElement &&
        createPortal(
          <Modal
            title={title}
            message={message}
            onClose={() => setShowPopup(false)}
          />,
          portalElement
        )}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
