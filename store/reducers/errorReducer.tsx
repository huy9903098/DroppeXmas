import { GET_ERRORS } from '../types';

const initialState = {};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      console.log('action.paylad');
      return action.payload;
    default:
      return state;
  }
};
