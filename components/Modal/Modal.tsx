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
        <div className={styles.closeContainer} onClick={onClose}>
          <div className={styles.leftright}></div>
          <div className={styles.rightleft}></div>
        </div>
        {children}
      </div>
    </>
  );
};
