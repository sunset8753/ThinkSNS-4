const createAction = (type, data) => ({
  type, data,
});

export const STORE_LIST_APPEND = 'STORE_LIST_APPEND';
export const STORE_LIST_PREPENT = 'STORE_LIST_PREPENT';
export const DELETE_STORE_LIST_ITEM = 'DELETE_STORE_LIST_ITEM';

export const storeListAppend = (data) => createAction(STORE_LIST_APPEND, data);
export const storeListPrepent = (data) => createAction(STORE_LIST_PREPENT, data);
export const deleteStoreListItem = (fn) => ({
  type: DELETE_STORE_LIST_ITEM,
  fn,
});
