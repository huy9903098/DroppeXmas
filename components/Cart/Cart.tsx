import { ProductCard } from '@components/ProductCard/ProductCard';
import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import styles from './Cart.module.scss';
import {
  fetchProductsByCartId,
  updateProductsByCartId,
} from '@store/actions/productAction';
import { SuccessModal } from '@components/Modal/Success/SuccessModal';
import { PreProduct, ProductInterface } from '@utils/types';

interface CartProps {
  userId: number;
  cartId: number;
}

export const Cart: React.FC<CartProps> = ({ userId, cartId }) => {
  const { cartProducts, productIdIdentical } = useSelector(
    (state: RootStateOrAny) => state.product
  );

  const { carts } = useSelector((state: RootStateOrAny) => state.cart);

  const { users } = useSelector((state: RootStateOrAny) => state.user);
  const dispatch = useDispatch();
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [subTotalCartPrice, setSubTotalCartPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [editProducts, setEditProducts] = useState(null);
  const [updateState, setUpdateState] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByCartId(carts[userId].products));
  }, []);

  useEffect(() => {
    if (cartProducts.products && productIdIdentical) {
      setEditProducts(cartProducts.products);
      changeTotalPrice(cartProducts.products);
    }
  }, [cartProducts.products, productIdIdentical]);

  const changeTotalPrice = (products) => {
    let discount = 0;
    let subtotal = 0;

    products.map((product) => {
      let productprice = !product.discard
        ? product.price * product.quantity
        : 0;
      subtotal += productprice;
      if (productIdIdentical[product.id] > 1) {
        discount += (productprice * productIdIdentical[product.id]) / 10;
      }
    });

    setTotalCartPrice(subtotal - discount);
    setSubTotalCartPrice(subtotal);
    setDiscountPrice(discount);
  };

  const saveCart = () => {
    let finalCart = [] as PreProduct[];

    for (let a = 0; a < editProducts.length; a++) {
      finalCart.push({
        productId: editProducts[a].id,
        quantity: editProducts[a].discard ? 0 : editProducts[a].quantity,
      });
    }
    dispatch(
      updateProductsByCartId(finalCart, userId, cartId, (success) => {
        setUpdateState(success);
      })
    );
  };

  const editProduct = (productId, quantity, discard) => {
    let newProducts = editProducts.map((product) => {
      if (product.id === productId) {
        product.quantity = quantity;
        product.discard = discard;
      }
      return product;
    });
    changeTotalPrice(newProducts);
    setEditProducts(newProducts);
  };
  return (
    <div className={styles.cartmodal}>
      <SuccessModal open={updateState} onClose={() => setUpdateState(false)}>
        <div className={styles.succsModal}>
          <div>Successfully Updated</div>
          {editProducts &&
            editProducts.map((product) => {
              return (
                <div key={product.id}>
                  {product.title}x{product.quantity}
                </div>
              );
            })}
        </div>
      </SuccessModal>
      <div className={styles.cartmodal__header}>
        <h1>
          {users[userId]
            ? `${users[userId].name.firstname}'s List`
            : `loading...`}
        </h1>
      </div>
      {editProducts && !cartProducts.loading ? (
        editProducts.map((product) => {
          return (
            <div key={product.id}>
              <ProductCard product={product} editProduct={editProduct} />
              <hr />
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
      <div className={styles.cartSummary}>
        <p className={styles.paragraph}>
          Subtotal:
          <span className={styles.right}>
            {!cartProducts.loading
              ? `$${subTotalCartPrice.toFixed(2)}`
              : `Calculating ... `}
          </span>
        </p>
        <p className={styles.paragraph}>
          Discount:
          <span className={styles.right}>
            {!cartProducts.loading
              ? `- $${discountPrice.toFixed(2)}`
              : `Calculating ... `}
          </span>
        </p>
        <p className={styles.h3resp}>
          Total:
          <span className={styles.right}>
            {!cartProducts.loading
              ? `$${totalCartPrice.toFixed(2)}`
              : `Calculating ... `}
          </span>
        </p>
        <p className={styles.save}>
          <button
            className={`${styles.save__button} ${styles.btnInputSquare} ${
              styles.h4resp
            } ${cartProducts.updateLoading ? styles.pending : null}`}
            onClick={saveCart}
          >
            {cartProducts.updateLoading ? 'Pending...' : 'Save'}
          </button>
        </p>
      </div>
    </div>
  );
};
