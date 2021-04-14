import React, { useEffect, useState } from 'react';
import styles from './WishListItem.module.scss';
import { UserInterface } from '@utils/types/index';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@store/actions/productAction';

interface WishListItemProps {
  user: UserInterface;
  openModal(): any;
  chooseUser(id: number): any;
}

export const WishListItem: React.FC<WishListItemProps> = ({
  user,
  openModal,
  chooseUser,
}) => {
  const dispatch = useDispatch();
  const { carts } = useSelector((state: RootStateOrAny) => state.cart);
  const {
    products,
    productIdIdentical,
    loading: productsLoading,
  } = useSelector((state: RootStateOrAny) => state.product);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  let userProducts = products[user.id];

  useEffect(() => {
    if (userProducts && productIdIdentical) {
      // console.log('userID', user.id, userProducts);
      let sum = 0;
      userProducts.map((product) => {
        sum += product.price * product.quantity;
        if (productIdIdentical[product.id] > 1) {
          sum *= 1 - productIdIdentical[product.id] / 10;
        }
      });
      setTotalCartPrice(sum);
    }
  }, [userProducts, productIdIdentical]);

  useEffect(() => {
    if (carts[user.id].products) {
      dispatch(fetchProducts(carts[user.id].products, user.id));
    }
  }, [carts]);
  return (
    <>
      <div
        className={styles.cart__container}
        onClick={() => {
          openModal();
          chooseUser(user.id);
        }}
      >
        <h3 className={`${styles.cart__info} ${styles.h3resp}`}>
          {user.name.firstname}
        </h3>

        <div className={`${styles.flexCenter}`}>
          {userProducts && !productsLoading
            ? `$` + totalCartPrice.toFixed(2)
            : 'loading...'}
        </div>
      </div>
    </>
  );
};
