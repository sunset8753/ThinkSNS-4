import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AvatarReducer from '../reducer/AvatarReducer.js';
import { AVATAR_DEFAULT, createAvatarAction } from '../action/AvatarAction.js';

const AvatarStore = createStore(AvatarReducer, AvatarReducer(null, createAvatarAction(AVATAR_DEFAULT)), applyMiddleware(thunk));

export default AvatarStore;
