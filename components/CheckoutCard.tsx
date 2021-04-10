import React from 'react';
import styles from '@styles/CheckoutCard.module.scss';

interface CheckoutCardProps {}

export const CheckoutCard: React.FC<CheckoutCardProps> = ({}) => {
  return (
    <div className={styles.checkoutContainer}>
      <h2 className={styles.checkoutContainer__header}>Cart's details</h2>
    </div>
  );
};
