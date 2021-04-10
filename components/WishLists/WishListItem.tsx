import React, { useEffect, useState } from 'react';
import styles from '@styles/WishListItem.module.scss';
import Link from 'next/link';
import { User } from '@utils/types/index';

interface WishListItemProps {
  user: User;
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
