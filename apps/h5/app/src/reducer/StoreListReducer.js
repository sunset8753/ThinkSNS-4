import { STORE_LIST_APPEND, STORE_LIST_PREPENT, DELETE_STORE_LIST_ITEM } from '../action/StoreListAction';

const StoreListReducer = (state, action) => {
  switch (action.type) {
    case STORE_LIST_APPEND:
      return [...state, {...action.data}];

    case STORE_LIST_PREPENT:
      return [{...action.data}, ...state];

    case DELETE_STORE_LIST_ITEM:
      return [...action.fn(state)];

    default:
      return state;
  }
};

export default StoreListReducer;