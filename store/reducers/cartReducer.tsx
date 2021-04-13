import * as types from '@store/styles';
import { CartInterface, CartsInterface } from '@utils/types';

const initialState = {
  carts: {} as CartsInterface,
  cart: {} as CartInterface,
  loading: false as boolean,
  error: null as any,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CART_LOADING:
      return {
        ...state,
        loading: true,
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
