import * as types from '@store/types';
import { CartsInterface } from '@utils/types';

const initialState = {
  carts: {} as CartsInterface,
  loading: false as boolean,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CART_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_CART:
      return {
        ...state,
        carts: {
          ...state.carts,
          [action.key]: {
            ...state.carts[action.key],
            products: action.payload,
          },
        },
        loading: false,
        error: null,
      };
    case types.GET_CART:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
      };
    case types.GET_CARTS:
      return {
        ...state,
        carts: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
