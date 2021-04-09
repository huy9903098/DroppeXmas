import * as types from '../styles';
import axios from 'axios';

export const fetchCarts = () => async (dispatch) => {
  const res = await axios.get('https://fakestoreapi.com/carts?limit=5');
  dispatch({
    types: types.GET_CARTS,
    payload: res.data,
  });
};
