import * as types from '../styles';
const initialState = {
  carts: [],
  post: [],
  loading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
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
