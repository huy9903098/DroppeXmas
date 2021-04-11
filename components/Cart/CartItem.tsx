import React from 'react';
import styles from './CartItem.module.scss';

interface CartItemProps {}

export const CartItem: React.FC<CartItemProps> = ({}) => {
  return <div className={styles.container}>Hello</div>;
};
