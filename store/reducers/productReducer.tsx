import * as types from '@store/types';
import { ProductInterface } from '@utils/types';

const initialState = {
  cartProducts: {
    products: [] as ProductInterface[],
    loading: false,
    updateLoading: false,
  },
  productsByUserId: {},
  productIdIdentical: {},
  loading: false as boolean,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCTS_CART_LOADING:
      return {
        ...state,
        cartProducts: {
          ...state.cartProducts,
          loading: true,
        },
      };
    case types.PRODUCT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.GET_SINGLE_CART_PRODUCT:
      return {
        ...state,
        cartProducts: {
          products: action.payload,
          loading: false,
        },
        loading: false,
      };
    case types.GET_DISCOUNT:
      return {
        ...state,
        productIdIdentical: action.payload,
        loading: false,
        error: null,
      };
    case types.GET_PRODUCT:
      return Object.assign({}, state, {
        productsByUserId: {
          ...state.productsByUserId,
          [action.key]: action.payload,
        },
        loading: false,
        error: null,
      });
    default:
      return state;
  }
};
