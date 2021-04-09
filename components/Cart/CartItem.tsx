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
  const [loading, setLoading] = useState(true);
  const [cartItem, setCartItem] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://fakestoreapi.com/carts?limit=5');

      setCartItem(result.data);
      setLoading(false);
      console.log('result.dat: ', result.data);
    };

    fetchData();
  }, []);
  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartInfo}>Name: John</div>
      <div className={styles.cartPrice}> Price: $300</div>
    </div>
  );
};
