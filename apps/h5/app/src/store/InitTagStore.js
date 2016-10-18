import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import InitTagReducer from '../reducer/InitTagReducer.js';

const InitTagStore = createStore(InitTagReducer, false, applyMiddleware(thunk));

export default InitTagStore;