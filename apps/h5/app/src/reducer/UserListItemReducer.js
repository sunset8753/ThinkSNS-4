import { SET_USER_DATA, UPDATE_USER_DATA } from '../action/UserListItemAction.js';

const UserListItemReducer = (state, {type, data}) => {
  // console.log(state);
  switch (type) {
    case SET_USER_DATA:
      return {
        ...data
      };

    case UPDATE_USER_DATA:
      return {
        ...state,
        ...data,
      };

    default:
      return state;
  }
}

export default UserListItemReducer;