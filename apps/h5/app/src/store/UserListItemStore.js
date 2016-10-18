import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import UserListItemReducer from '../reducer/UserListItemReducer.js';
import UserListStore, { getUserItem } from './UserListStore.js';
import { UserListAppend  } from '../action/UserListAction.js';

export const createUserListItemStore = (user_id, data) => {

  const user = {...getUserItem(user_id), ...data, user_id};
  const store = createStore(UserListItemReducer, user, applyMiddleware(thunk));

  UserListStore.dispatch(UserListAppend({...user, store})); // 暂时不确定用户公用列表是否是携带用户数据

  return store;
};


export const getUserListItemStore = (user_id) => {
  let user = getUserItem(user_id);

  if (!user || !user.store) {
    return null;
  }

  return user.store;
};
