import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import UserListReducer from '../reducer/UserListReducer.js';

const UserListStore = createStore(UserListReducer, {}, applyMiddleware(thunk));

export const getUserItem = (user_id) => {
  let state = UserListStore.getState();
  return state[user_id] || null;
};

export default UserListStore;