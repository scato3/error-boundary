"use client";

import { useRef } from "react";
import styles from "@/components/modal.module.scss";

interface PopupProps {
  title: string;
  message: string;
  onClose: () => void;
}

const Modal = ({ title, message, onClose }: PopupProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose(); // 모달 외부 클릭 시 닫기
    }
  };

  return (
    <div className={styles.dimmed} onClick={handleOverlayClick}>
      <div className={styles.popup} ref={modalRef}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <button className={styles.button} onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;
