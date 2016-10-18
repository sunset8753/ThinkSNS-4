import { USER_APPEND, USER_PREPEND, DELETE_USER_ITEM, UPDATE_USER_ITEM } from '../action/UserListAction.js';

const UserListReducer = (state = {}, {type, data}) => {
  switch (type) {
    case USER_APPEND:
    case UPDATE_USER_ITEM:
      let item1 = {};
      item1[data.user_id] = data;
      return {
        ...state,
        ...item1,
      };

    case USER_PREPEND:
      let item2 = {};
      item2[data.user_id] = data;
      return {
        ...item2,
        ...state,
      };

    case DELETE_USER_ITEM:
      let {...users} = state;
      delete users[data.user_id];
      return {
        ...users,
      }

    default:
      return state;
  }
};

export default UserListReducer;