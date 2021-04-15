import * as types from '@store/styles';
import { CartsInterface } from '@utils/types';
import axios from 'axios';
import { fetchProductsIdentical } from './productAction';
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
      let productDiscounts = {};
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

      dispatch(fetchProductsIdentical(productDiscounts));
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

// export const fetchCartProducts = (products, userId) => (dispatch) => {
//   dispatch(setCartLoading());
//   let newProducts = products.map(async (product) => {
//     return await axios
//       .get(`https://fakestoreapi.com/products/${product.productId}`, {
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//         },
//       })
//       .then((resp) => {
//         resp.data.quantity = product.quantity;

//         return resp.data;
//       })
//       .catch((err) =>
//         dispatch({
//           type: types.GET_ERRORS,
//           payload: err.response.data,
//         })
//       );
//   });

//   Promise.all(newProducts).then((products) => {
//     dispatch({
//       type: types.GET_CART_PRODUCT,
//       payload: products,
//       key: userId,
//     });
//   });
// };

// export const fetchCart = (userId) => (dispatch) => {
//   dispatch(setCartLoading());
//   if (userId >= 0) {
//     axios
//       .get(`https://fakestoreapi.com/carts/user/${userId}`)
//       .then((res) => {
//         //fetch products by product id provided
//         if (res.data.length > 0) {
//           let newProduct = res.data[0].products.map((product) => {
//             return axios
//               .get(`https://fakestoreapi.com/products/${product.productId}`)
//               .then((resp) => {
//                 resp.data.quantity = product.quantity;
//                 return resp.data;
//               });
//           });
//           Promise.all(newProduct).then((products) => {
//             res.data[0].products = products;

//             dispatch({
//               type: types.GET_CART,
//               payload: res.data[0],
//             });
//           });
//         } else {
//           dispatch({
//             type: types.GET_CART,
//             payload: res.data[0],
//           });
//         }
//       })
//       .catch((err) =>
//         dispatch({
//           type: types.GET_ERRORS,
//           payload: err.response.data,
//         })
//       );
//   }
// };

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
