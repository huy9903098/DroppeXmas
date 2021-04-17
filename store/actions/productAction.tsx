import * as types from '@store/types';
import { CartsInterface } from '@utils/types';
import axios from 'axios';
import { updateCart } from './cartAction';

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
        // inclue quanityt for total price display
        return resp.data;
      })
      .catch((err) =>
        dispatch({
          type: types.GET_ERRORS,
          payload: err.response.data,
        })
      );
  });

  Promise.all(newProducts).then((products) => {
    dispatch({
      type: types.GET_PRODUCT,
      payload: products,
      key: userId,
    });
  });
};

export const fetchProductsByCartId = (products) => (dispatch) => {
  dispatch(setCartProductsLoading());

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
  //get products for seperate cart

  Promise.all(newProducts).then((products) => {
    dispatch({
      type: types.GET_SINGLE_CART_PRODUCT,
      payload: products,
    });
  });
};

export const updateProductsByCartId = (
  products,
  userId: number,
  cartId: number
) => (dispatch) => {
  axios
    .put(`https://fakestoreapi.com/carts/${cartId}`, {
      userId: userId,
      date: new Date(),
      products,
    })
    .then((res) => {
      console.log('Carted updated');
    });
  // This function will update the cart into the database
  dispatch(updateCart(products, userId));
  // This function will update the cart directly into the local state which won't cause extra loading and rerender time
};

export const updateProductsIdentical = (carts: CartsInterface) => (
  dispatch
) => {
  dispatch(clearErrors());
  var productArr = Object.keys(carts).map((key) => carts[key]);
  let productDiscounts = {};
  for (let a = 0; a < productArr.length; a++) {
    productArr[a].products.map((product) => {
      if (
        !productDiscounts[product.productId] &&
        productDiscounts[product.quantity] !== 0
      ) {
        productDiscounts[product.productId] = 1;
      } else {
        if (product.quantity !== 0) {
          productDiscounts[product.productId]++;
        }
      }
    });
  }
  // assign product as key and duplicate as number value, enable to access data fast O(1) rather than array O(n)

  dispatch({
    type: types.GET_DISCOUNT,
    payload: productDiscounts,
  });
};

export const setCartProductsLoading = () => {
  return {
    type: types.PRODUCTS_CART_LOADING,
  };
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
