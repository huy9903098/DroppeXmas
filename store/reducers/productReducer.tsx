import * as types from '@store/styles';

const initialState = {
  products: {},
  productIdIdentical: {},
  loading: false as boolean,
  error: null as any,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCT_LOADING:
      return {
        ...state,
        loading: true,
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
        products: {
          ...state.products,
          [action.key]: action.payload,
        },
        loading: false,
        error: null,
      });
    default:
      return state;
  }
};
