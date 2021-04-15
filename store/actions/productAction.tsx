import * as types from '@store/styles';
import axios from 'axios';

export const fetchProducts = (products, userId) => (dispatch) => {
  dispatch(setProductLoading());
  let newProducts = products.map(async (product) => {
    return await axios
      .get(`https://fakestoreapi.com/products/${product.productId}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((resp) => {
        resp.data.quantity = product.quantity;
        resp.data.discard = false;
        return resp.data;
      })
      .catch((err) =>
        dispatch({
          type: types.GET_ERRORS,
          payload: err.response.data,
        })
      );
  });
  //update cart then update with new data

  Promise.all(newProducts).then((products) => {
    dispatch({
      type: types.GET_PRODUCT,
      payload: products,
      key: userId,
    });
  });
};

export const fetchProductsIdentical = (products) => (dispatch) => {
  dispatch({
    type: types.GET_DISCOUNT,
    payload: products,
  });
};

export const setProductLoading = () => {
  return {
    type: types.PRODUCT_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: types.CLEAR_ERRORS,
  };
};
