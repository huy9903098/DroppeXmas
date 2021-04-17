import * as types from '@store/types';
import { CartsInterface, ProductDiscounts } from '@utils/types';
import axios from 'axios';
import { fetchUsers } from './userAction';

export const fetchCarts = () => (dispatch) => {
  dispatch(setCartLoading());
  axios
    .get('https://fakestoreapi.com/carts', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then((res) => {
      let five_carts: CartsInterface = {};
      // make 5 carts an object with userID as key ==> to access data with O(1)
      let five_users: number[] = [];
      let productDiscounts: ProductDiscounts = {};
      for (let a = 0; a < res.data.length; a++) {
        if (!five_carts[res.data[a].userId]) {
          five_carts[res.data[a].userId] = res.data[a];

          five_users.push(res.data[a].userId);
          res.data[a].products.map((product) => {
            if (!productDiscounts[product.productId]) {
              productDiscounts[product.productId] = 1;
            } else {
              productDiscounts[product.productId]++;
            }
          });
        }
      }

      dispatch(fetchUsers(five_users));

      dispatch({
        type: types.GET_CARTS,
        payload: five_carts,
      });
    })
    .catch((err) =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const updateCart = (products, userId) => (dispatch) => {
  dispatch(setCartLoading());
  dispatch({
    type: types.UPDATE_CART,
    payload: products,
    key: userId,
  });
};

// Set loading state
export const setCartLoading = () => {
  return {
    type: types.CART_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: types.CLEAR_ERRORS,
  };
};
