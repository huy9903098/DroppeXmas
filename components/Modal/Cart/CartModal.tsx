import { ProductCard } from '@components/ProductCard/ProductCard';
import { TitleBar } from '@components/TitleBar/TitleBar';
import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import styles from './CartModal.module.scss';

interface CartModalProps {
  userId: number;
}

export const CartModal: React.FC<CartModalProps> = ({ userId }) => {
  const {
    products,
    productIdIdentical,
    loading: productsLoading,
  } = useSelector((state: RootStateOrAny) => state.product);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [subTotalCartPrice, setSubTotalCartPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [editProducts, setEditProducts] = useState(null);
  let userProducts = products[userId];

  useEffect(() => {
    if (userProducts && productIdIdentical) {
      let discount = 0;
      let subtotal = 0;
      userProducts.map((product) => {
        let productprice = product.price * product.quantity;
        subtotal += productprice;

        if (productIdIdentical[product.id] > 1) {
          discount = (productprice * productIdIdentical[product.id]) / 10;
        }
      });

      setTotalCartPrice(subtotal - discount);
      setSubTotalCartPrice(subtotal);
      setDiscountPrice(discount);
    }
  }, [userProducts, productIdIdentical]);
  return (
    <div>
      <TitleBar />
      {userProducts && !productsLoading ? (
        userProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
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
