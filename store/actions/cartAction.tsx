import * as types from '@store/styles';
import axios from 'axios';
import { fetchUsersNew } from './userAction';

export const fetchCarts = () => (dispatch) => {
  dispatch(setCartLoading());
  axios
    .get('https://fakestoreapi.com/carts')
    .then((res) => {
      let five_carts = {};
      let five_users = [];
      for (let a = 0; a < res.data.length; a++) {
        if (!five_carts[res.data[a].userId]) {
          five_carts[res.data[a].userId] = res.data[a];
          five_users.push(res.data[a].userId);
        }
      }
      dispatch(fetchUsersNew(five_users));

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

export const fetchCart = (userId) => (dispatch) => {
  dispatch(setCartLoading());
  if (userId >= 0) {
    axios
      .get(`https://fakestoreapi.com/carts/user/${userId}`)
      .then((res) => {
        //fetch products by product id provided
        if (res.data.length > 0) {
          let newProduct = res.data[0].products.map((product) => {
            return axios
              .get(`https://fakestoreapi.com/products/${product.productId}`)
              .then((resp) => {
                resp.data.quantity = product.quantity;
                return resp.data;
              });
          });
          Promise.all(newProduct).then((products) => {
            res.data[0].products = products;

            dispatch({
              type: types.GET_CART,
              payload: res.data[0],
            });
          });
        } else {
          dispatch({
            type: types.GET_CART,
            payload: res.data[0],
          });
        }
      })
      .catch((err) =>
        dispatch({
          type: types.GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
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
