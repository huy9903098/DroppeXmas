import { ProductCard } from '@components/ProductCard/ProductCard';
import { TitleBar } from '@components/TitleBar/TitleBar';
import React, { useEffect, useState } from 'react';
import { RootStateOrAny, shallowEqual, useSelector } from 'react-redux';
import styles from './CartModal.module.scss';
import _ from 'underscore';

interface CartModalProps {
  userId: number;
}

export const CartModal: React.FC<CartModalProps> = ({ userId }) => {
  const {
    productsByUserId,
    productIdIdentical,
    loading: productsLoading,
  } = useSelector(
    (state: RootStateOrAny) => state.product,
    (prev, next) =>
      prev.productsByUserId === next.productsByUserId &&
      prev.productIdIdentical === next.productIdIdentical &&
      prev.productsLoading === next.productsLoading
  );
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [subTotalCartPrice, setSubTotalCartPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [editProducts, setEditProducts] = useState(null);

  useEffect(() => {
    if (productsByUserId[userId] && productIdIdentical) {
      var result = {};
      for (var i = 0; i < productsByUserId[userId].length; i++) {
        result[productsByUserId[userId][i].id] = productsByUserId[userId][i];
      }
      console.log('result', result);
      setEditProducts(result);
      changeTotalPrice(result);
    }
  }, [productsByUserId[userId], productIdIdentical]);

  const changeTotalPrice = (products) => {
    let discount = 0;
    let subtotal = 0;
    Object.keys(products).map((productId) => {
      let productprice =
        products[productId].price * products[productId].quantity;
      subtotal += productprice;

      if (productIdIdentical[products[productId].id] > 1) {
        discount +=
          (productprice * productIdIdentical[products[productId].id]) / 10;
      }
    });

    setTotalCartPrice(subtotal - discount);
    setSubTotalCartPrice(subtotal);
    setDiscountPrice(discount);
  };

  const editProduct = (productId, quantity) => {
    setEditProducts((prevState) => ({
      ...prevState,
      [productId]: {
        ...prevState[productId],
        quantity: quantity,
      },
    }));
    changeTotalPrice(editProducts);
  };
  return (
    <div>
      <TitleBar />
      {editProducts ? (
        Object.keys(editProducts).map((product) => {
          return (
            <ProductCard
              key={editProducts[product].id}
              product={editProducts[product]}
              editProduct={editProduct}
            />
          );
        })
      ) : (
        <div>Laoding...</div>
      )}
      <div>
        <div>Subtotal: {subTotalCartPrice.toFixed(2)}</div>
        <div>Discount: {discountPrice.toFixed(2)}</div>
        <div>Total: {totalCartPrice.toFixed(2)}</div>
        <button>Save</button>
      </div>
    </div>
  );
};
