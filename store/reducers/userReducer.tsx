import * as types from '@store/styles';
import { UserInterface } from '@utils/types';

const initialState = {
  users: [] as UserInterface[],
  user: {} as UserInterface,
  loading: false as boolean,
  error: null as any,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    case types.GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
