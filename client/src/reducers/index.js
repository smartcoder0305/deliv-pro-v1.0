import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import delivery from './delivery';
import search from './search';

export default combineReducers({
  alert,
  auth,
  delivery,
  search,
});
