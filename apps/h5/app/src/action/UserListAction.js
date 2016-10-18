export const createUserListAction = (type, data) => {
  return {type, data};
};

export const USER_APPEND = 'USER_APPEND';
export const UserListAppend = (data) => createUserListAction(USER_APPEND, data);

export const USER_PREPEND = 'USER_PREPEND';
export const UserListPrepend = (data) => createUserListAction(USER_PREPEND, data);

export const DELETE_USER_ITEM = 'DELETE_USER_ITEM';
export const DeleteUserItem = (user_id) => createUserListAction(DELETE_USER_ITEM, {user_id});

export const UPDATE_USER_ITEM = 'UPDATE_USER_ITEM';
export const UpdateUserItem = (user_id, data = {}) => createUserListAction(UPDATE_USER_ITEM, {...data, user_id});
