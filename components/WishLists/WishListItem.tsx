import React, { useEffect, useState } from 'react';
import styles from './WishListItem.module.scss';
import Link from 'next/link';
import { UserInterface } from '@utils/types/index';

interface WishListItemProps {
  user: UserInterface;
}

export const WishListItem: React.FC<WishListItemProps> = ({ user }) => {
  return (
    <Link href="/cart/[id]" as={`/cart/${user.id}`}>
      <div className={styles.cartContainer}>
        <div className={styles.cartInfo}>
          {user.name.firstname} {user.name.lastname}'s Wish List
        </div>
      </div>
    </Link>
  );
};
