import React from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  open: boolean;
  onClose(): any;
}

export const Modal: React.FC<ModalProps> = ({ open, children, onClose }) => {
  if (!open) return null;
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modal}>
        <button onClick={onClose}>Close modal</button>
        {children}
      </div>
    </>
  );
};
