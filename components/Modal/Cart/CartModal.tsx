import { ProductCard } from '@components/ProductCard/ProductCard';
import { TitleBar } from '@components/TitleBar/TitleBar';
import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import styles from './CartModal.module.scss';
import {
  fetchProductsByCartId,
  updateProductsByCartId,
} from '@store/actions/productAction';

interface CartModalProps {
  userId: number;
  cartId: number;
}

export const CartModal: React.FC<CartModalProps> = ({ userId, cartId }) => {
  const { cartProducts, productIdIdentical } = useSelector(
    (state: RootStateOrAny) => state.product
  );
  const { carts, loading: cartsLoading } = useSelector(
    (state: RootStateOrAny) => state.cart
  );
  const dispatch = useDispatch();
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [subTotalCartPrice, setSubTotalCartPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [editProducts, setEditProducts] = useState(null);

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
    let finalCart = [];

    for (let a = 0; a < editProducts.length; a++) {
      finalCart.push({
        productId: editProducts[a].id,
        quantity: editProducts[a].discard ? 0 : editProducts[a].quantity,
      });
    }
    dispatch(updateProductsByCartId(finalCart, userId));
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
    <div>
      <TitleBar />
      {editProducts && !cartProducts.loading ? (
        editProducts.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              editProduct={editProduct}
            />
          );
        })
      ) : (
        <div>Loading...</div>
      )}
      <div>
        <div>
          Subtotal:{' '}
          {!cartProducts.loading
            ? subTotalCartPrice.toFixed(2)
            : `Calculating ... `}
        </div>
        <div>
          Discount:{' '}
          {!cartProducts.loading
            ? discountPrice.toFixed(2)
            : `Calculating ... `}
        </div>
        <div>
          Total:{' '}
          {!cartProducts.loading
            ? totalCartPrice.toFixed(2)
            : `Calculating ... `}
        </div>
        <button onClick={saveCart}>Save</button>
      </div>
    </div>
  );
};
