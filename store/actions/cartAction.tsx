import * as types from '@store/styles';
import axios from 'axios';

export const fetchCart = (userId) => async (dispatch) => {
  dispatch(setCartLoading());
  if (userId >= 0) {
    await axios
      .get(`https://fakestoreapi.com/carts/user/${userId}?limit=1`)
      .then((res) => {
        dispatch({
          type: types.GET_CART,
          payload: res.data[0],
        });
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
