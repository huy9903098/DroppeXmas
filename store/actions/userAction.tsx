import * as types from '@store/styles';
import axios from 'axios';

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
        console.log('res users:', res.data);
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
