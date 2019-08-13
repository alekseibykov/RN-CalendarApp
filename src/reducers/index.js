import { combineReducers } from 'redux';
import ListReducer from './ListReducer';
import ItemReducer from './ItemReducer';

export default combineReducers({
  content: ListReducer,
  show: ItemReducer,
});
