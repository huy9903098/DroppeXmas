import { TitleBar } from '@components/TitleBar/TitleBar';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { CartItem } from './CartItem';

export const Cart = ({}) => {
  const { loading: userLoading, user } = useSelector(
    (state: RootStateOrAny) => state.user
  );
  const { loading: cartLoading, cart, error: cartError } = useSelector(
    (state: RootStateOrAny) => state.cart
  );
  return (
    <div>
      <TitleBar />
      <div>
        {!cartLoading ? (
          <>
            {cart.products &&
              cart.products.map((product) => <CartItem key={product.id} />)}
          </>
        ) : (
          <div>Product loading ...</div>
        )}

        {cartError && <div className="error">{cartError}</div>}
      </div>
    </div>
  );
};
