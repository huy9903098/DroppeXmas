import React, { useState } from 'react';
import { WishListItem } from './WishListItem';
import { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { fetchCarts } from '@store/actions/cartAction';
import styles from './WishLists.module.scss';
import { updateProductsIdentical } from '@store/actions/productAction';
import { Modal } from '@components/Modal/Modal';
import { Cart } from '@components/Cart/Cart';

export const WishLists: React.FC<{}> = ({}) => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state: RootStateOrAny) => state.user);
  const { productsByUserId } = useSelector(
    (state: RootStateOrAny) => state.product
  );
  const { carts } = useSelector((state: RootStateOrAny) => state.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUserId, setModalUserId] = useState(0);
  const [modalCartId, setmodalCartId] = useState(0);

  useEffect(() => {
    dispatch(fetchCarts());
  }, []);
  useEffect(() => {
    dispatch(updateProductsIdentical(carts));
  }, [carts]);

  const chooseCart = (userId, cartId) => {
    setModalUserId(userId);
    setmodalCartId(cartId);
  };

  return (
    <>
      <div className={styles.cartHeader}>
        <h3 className={styles.h3resp}>Name</h3>
        <h3 className={`${styles.flexCenter} ${styles.h3resp}`}>Price</h3>
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Cart userId={modalUserId} cartId={modalCartId} />
      </Modal>

      {users && productsByUserId && !loading ? (
        users.map(function (user) {
          return (
            <WishListItem
              user={user}
              key={user.id}
              openModal={() => setIsModalOpen(true)}
              chooseCart={chooseCart}
            />
          );
        })
      ) : (
        <div>Loading ....</div>
      )}
    </>
  );
};
