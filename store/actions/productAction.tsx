import * as types from '@store/types';
import { CartsInterface, PreProduct } from '@utils/types';
import axios from 'axios';
import { updateCart } from './cartAction';

export const fetchProducts = (products: PreProduct[], userId: number) => (
  dispatch
) => {
  dispatch(setProductLoading());
  let newProducts = products.map(async (product) => {
    return await axios
      .get(`https://fakestoreapi.com/products/${product.productId}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        resp.data.quantity = product.quantity;
        resp.data.discard = product.discard;
        // include quanity for total price display on the item
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
      type: types.GET_PRODUCTS,
      payload: products,
      key: userId,
    });
  });
};

export const fetchProductsCart = (products) => (dispatch) => {
  dispatch(setCartProductsLoading());
  const copyProducts = JSON.parse(JSON.stringify(products));
  // make a copy of the products to prevent reference which change the original

  dispatch({
    type: types.GET_SINGLE_CART_PRODUCT,
    payload: copyProducts,
  });
};

export const updateProductsByCartId = (
  products: PreProduct[],
  userId: number,
  cartId: number,
  callback
) => (dispatch) => {
  dispatch(setCartProductsUpdateLoading());

  axios
    .put(
      `https://fakestoreapi.com/carts/${cartId}`,
      {
        userId: userId,
        date: new Date(),
        products,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((res) => {
      // UPDATED CARTS
      // callback(res.data)
      // can't use res.data from API because there are 2 carts with id=6 so it will provide with wrong information
      callback(true);
      dispatch(updateCart(products, userId));
      // This function will update the cart directly into the local state when cart is update successfully into the database
    })
    .catch((err) => {
      callback(false);
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data,
      });
    });
  // This function will update the cart into the database
};

export const updateProductsIdentical = (carts: CartsInterface) => (
  dispatch
) => {
  dispatch(clearErrors());

  var productArr = Object.keys(carts).map((key) => carts[key]);
  let productDiscounts = {};
  for (let a = 0; a < productArr.length; a++) {
    productArr[a].products.map((product) => {
      if (!productDiscounts[product.productId]) {
        if (product.quantity !== 0 && !product.discard) {
          productDiscounts[product.productId] = 1;
        }
      } else {
        if (product.quantity !== 0 && !product.discard) {
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

export const setCartProductsUpdateLoading = () => {
  return {
    type: types.PRODUCTS_CART_UPDATE_LOADING,
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
