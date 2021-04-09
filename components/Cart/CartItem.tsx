import React, { useEffect, useState } from 'react';
import styles from '../../styles/CartItem.module.scss';
import axios from 'axios';

interface CartItemProps {
  item: CartItem;
}

interface CartItem {
  date: Date;
  id: number;
  userId: number;
  products: Product[];
}

interface Product {
  productId: number;
  quantity: number;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartInfo}>Name: John</div>
      <div className={styles.cartPrice}> Price: $300</div>
    </div>
  );
};
