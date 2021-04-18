import { Modal } from '@components/Modal/Modal';
import { SpecialOffer } from '@components/SpecialOffer/SpecialOffer';
import React, { useState } from 'react';
import styles from './TitleBar.module.scss';

interface TitleBarProps {}

export const TitleBar: React.FC<TitleBarProps> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.title}>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SpecialOffer />
      </Modal>
      <h1 className={styles.h1resp}>Wish Lists Collection</h1>
      <div className={styles.offer} onClick={() => setIsModalOpen(true)}>
        <h1 className={styles.h3resp}>Special Offer !</h1>
      </div>
    </div>
  );
};
