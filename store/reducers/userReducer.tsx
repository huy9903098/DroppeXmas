import * as types from '@store/types';
import { UserInterface } from '@utils/types';

const initialState = {
  users: [] as UserInterface[],
  usersById: {},
  loading: false as boolean,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USERS_LOADING:
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
        usersById: {
          ...state.usersById,
          [action.key]: action.payload,
        },
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
