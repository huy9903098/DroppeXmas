import * as types from '@store/types';
import {
  ProductDiscounts,
  ProductInterface,
  ProductObjectByUser,
} from '@utils/types';

const initialState = {
  cartProducts: {
    products: [] as ProductInterface[],
    loading: false as boolean,
    updateLoading: false as boolean,
  },
  productsByUserId: {} as ProductObjectByUser,
  productIdIdentical: {} as ProductDiscounts,
  loading: false as boolean,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCTS_CART_UPDATE_LOADING:
      return {
        ...state,
        cartProducts: {
          ...state.cartProducts,
          updateLoading: true,
        },
      };
    case types.PRODUCTS_CART_UPDATE_CLEAR:
      return {
        ...state,
        cartProducts: {
          ...state.cartProducts,
          updateLoading: false,
        },
      };
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
    case types.GET_PRODUCTS:
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
