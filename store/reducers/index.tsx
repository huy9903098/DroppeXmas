import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { errorReducer } from './errorReducer';
import { productReducer } from './productReducer';
import { userReducer } from './userReducer';

export default combineReducers({
  cart: cartReducer,
  user: userReducer,
  product: productReducer,
  error: errorReducer,
});
