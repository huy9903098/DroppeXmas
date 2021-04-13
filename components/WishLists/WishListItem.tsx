import React, { useEffect, useState } from 'react';
import styles from './WishListItem.module.scss';
import Link from 'next/link';
import { CartInterface, UserInterface } from '@utils/types/index';
import { RootStateOrAny, useSelector } from 'react-redux';

interface WishListItemProps {
  user: UserInterface;
}

export const WishListItem: React.FC<WishListItemProps> = ({ user }) => {
  const { carts, loading } = useSelector((state: RootStateOrAny) => state.cart);
  const userCart: CartInterface = carts[user.id];
  return (
    <>
      {carts && !loading ? (
        <div className={styles.cartContainer}>
          <div className={`${styles.cartInfo} ${styles.flexCenter}`}>
            {user.name.firstname}
          </div>
        </div>
      ) : (
        <div>Loading ... </div>
      )}
    </>
  );
};
