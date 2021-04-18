import * as types from '@store/types';
import { UserInterface } from '@utils/types';
import axios from 'axios';

export const fetchUsers = (users: number[]) => (dispatch) => {
  dispatch(setUserLoading());
  let newUsers = [];
  for (let a = 0; a < users.length; a++) {
    newUsers.push(
      axios
        .get(`https://fakestoreapi.com/users/${users[a]}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => res.data)
        .catch((err) =>
          dispatch({
            type: types.GET_ERRORS,
            payload: err.response.data,
          })
        )
    );
  }

  Promise.all(newUsers)
    .then((user: UserInterface[]) => {
      dispatch({
        type: types.GET_USERS,
        payload: user,
      });
    })
    .catch((err) =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set loading state
export const setUserLoading = () => {
  return {
    type: types.USER_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: types.CLEAR_ERRORS,
  };
};
