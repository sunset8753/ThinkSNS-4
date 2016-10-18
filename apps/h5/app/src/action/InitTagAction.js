export const ADD_SELETE_TAG = 'ADD_SELETE_TAG';
export const DELETE_SELETE_TAG = 'DELETE_SELETE_TAG';
export const SET_TAG_LIST = 'SET_TAG_LIST';
export const setTagList = (tags) => ({
  type: SET_TAG_LIST,
  data: tags,
});

export const createSelectTagAction = (type, tag_id, name) => ({type, tag_id, name});

export const TagActionAsync = (action) => (
  dispatch => dispatch(action)
);