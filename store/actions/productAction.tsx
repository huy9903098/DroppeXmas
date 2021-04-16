import * as types from '@store/styles';
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
        resp.data.discard = resp.data.quantity > 0 ? false : true;
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
      type: types.GET_SINGLE_CART_PRODUCT,
      payload: products,
    });
  });
};

// export const fetchProductsByCartId = (cartId) => (dispatch) => {
//   dispatch(setCartProductsLoading());

//   // The fake API database have 2 carts with the same id = 6
//   // So this fetching function may return a false data for one of the cart with id =6
//   axios
//     .get(`https://fakestoreapi.com/carts/${cartId}`)
//     .then((res) => {
//       let newProducts = res.data.products.map(async (product) => {
//         return await axios
//           .get(`https://fakestoreapi.com/products/${product.productId}`, {
//             headers: {
//               'Access-Control-Allow-Origin': '*',
//             },
//           })
//           .then((resp) => {
//             resp.data.quantity = product.quantity;
//             resp.data.discard = resp.data.quantity > 0 ? false : true;
//             return resp.data;
//           })
//           .catch((err) =>
//             dispatch({
//               type: types.GET_ERRORS,
//               payload: err.response.data,
//             })
//           );
//       });
//       //update cart products with more data

//       Promise.all(newProducts).then((products) => {
//         dispatch({
//           type: types.GET_SINGLE_CART_PRODUCT,
//           payload: products,
//         });
//       });
//     })
//     .catch((err) =>
//       dispatch({
//         type: types.GET_ERRORS,
//         payload: err.response.data,
//       })
//     );
// };

export const updateProductsByCartId = (products, userId) => (dispatch) => {
  // dispatch(setProductLoading());
  // dispatch(fetchProducts(products, userId));
  dispatch(updateCart(products, userId));
};

export const updateProductsIdentical = (carts) => (dispatch) => {
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
