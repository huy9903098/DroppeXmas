import React from 'react';
import { WishListItem } from './WishListItem';
import { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { fetchCarts } from '@store/actions/cartAction';
import styles from './WishLists.module.scss';

interface WishListsProps {}

export const WishLists: React.FC<WishListsProps> = ({}) => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state: RootStateOrAny) => state.user);

  useEffect(() => {
    dispatch(fetchCarts());
  }, []);

  return (
    <>
      <div className={styles.cartHeader}>
        <div>Name</div>
        <div className={`${styles.flexCenter}`}>Price</div>
      </div>
      {users && !loading ? (
        users.map(function (user) {
          return <WishListItem user={user} key={user.id} />;
        })
      ) : (
        <div>Loading ....</div>
      )}
    </>
  );
};
