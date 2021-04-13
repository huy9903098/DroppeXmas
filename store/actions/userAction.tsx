import * as types from '@store/styles';
import { UserInterface } from '@utils/types';
import axios from 'axios';

export const fetchUsersNew = (users: string[]) => (dispatch) => {
  dispatch(setUserLoading());
  let newUsers = [];
  for (let a = 0; a < users.length; a++) {
    newUsers.push(
      axios
        .get(`https://fakestoreapi.com/users/${users[a]}`)
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
    .then((user) => {
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

export const fetchUsers = () => async (dispatch) => {
  dispatch(setUserLoading());
  await axios
    .get('https://fakestoreapi.com/users?limit=5')
    .then((res) => {
      dispatch({
        type: types.GET_USERS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const fetchUser = (userId) => async (dispatch) => {
  dispatch(setUserLoading());
  if (userId >= 0) {
    await axios
      .get(`https://fakestoreapi.com/users/${userId}`)
      .then((res) => {
        dispatch({
          type: types.GET_USER,
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch({
          type: types.GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
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
