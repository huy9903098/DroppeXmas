import * as types from '@store/styles';
import axios from 'axios';

export const fetchCart = (userId) => (dispatch) => {
  dispatch(setCartLoading());
  if (userId >= 0) {
    axios
      .get(`https://fakestoreapi.com/carts/user/${userId}?limit=1`)
      .then((res) => {
        //fetch products by product id provided

        const newProduct = res.data[0].products.map((product) => {
          return axios
            .get(`https://fakestoreapi.com/products/${product.productId}`)
            .then((resp) => {
              return resp.data;
            });
        });
        // console.log('res.data:', res.data[0]);
        Promise.all(newProduct).then((products) => {
          res.data[0].products = products;
          console.log('res.data[0]:', res.data[0]);
          dispatch({
            type: types.GET_CART,
            payload: res.data[0],
          });
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
