import React, { useState } from 'react';
import { WishListItem } from './WishListItem';
import { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { fetchCarts } from '@store/actions/cartAction';
import styles from './WishLists.module.scss';
import { Modal } from '@components/Modal/Modal';
import { CartModal } from '@components/Modal/Cart/CartModal';

interface WishListsProps {}

export const WishLists: React.FC<WishListsProps> = ({}) => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state: RootStateOrAny) => state.user);
  const {
    productsByUserId,
    productIdIdentical,
    loading: productsLoading,
  } = useSelector((state: RootStateOrAny) => state.product);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUserId, setModalUserId] = useState(0);

  useEffect(() => {
    dispatch(fetchCarts());
  }, []);

  const chooseUser = (id) => {
    setModalUserId(id);
  };

  return (
    <>
      <div className={styles.cartHeader}>
        <h3 className={styles.h3resp}>Name</h3>
        <h3 className={`${styles.flexCenter} ${styles.h3resp}`}>Price</h3>
      </div>
      {productsByUserId && productIdIdentical && !productsLoading ? (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CartModal userId={modalUserId} />
        </Modal>
      ) : null}
      {users && !loading ? (
        users.map(function (user) {
          return (
            <WishListItem
              user={user}
              key={user.id}
              openModal={() => setIsModalOpen(true)}
              chooseUser={chooseUser}
            />
          );
        })
      ) : (
        <div>Loading ....</div>
      )}
    </>
  );
};
