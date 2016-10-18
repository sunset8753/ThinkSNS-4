import { ADD_SELETE_TAG, DELETE_SELETE_TAG, SET_TAG_LIST } from '../action/InitTagAction.js';

const InitTagReducer = (state, action) => {
  switch (action.type) {
    case SET_TAG_LIST:
      return {
        list: action.data,
        selected: {},
      }

    case ADD_SELETE_TAG:
      let select = {};
      select[action.tag_id] = action.name;
      return {
        ...state,
        selected: {
          ...state.selected,
          ...select,
        }
      };

    case DELETE_SELETE_TAG:
      let { selected } = state;

      if (typeof selected[action.tag_id] !== undefined) {
        delete selected[action.tag_id];
      }

      return {
        ...state,
        selected: {...selected}
      };

    default:
      return state;
  }
};

export default InitTagReducer;