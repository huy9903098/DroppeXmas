import React from 'react';
import styles from './SuccessModal.module.scss';

interface SuccessModalProps {
  open: boolean;
  onClose(): any;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  children,
  onClose,
}) => {
  if (!open) return null;
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.success}>
        {children}
        <p>
          <button
            onClick={onClose}
            className={`${styles.button} ${styles.btnInputSquare}`}
          >
            OK
          </button>
        </p>
      </div>
    </>
  );
};
