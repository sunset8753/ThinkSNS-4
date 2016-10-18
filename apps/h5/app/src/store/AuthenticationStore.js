import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AuthenticationReducer from '../reducer/AuthenticationReducer.js';

const AuthenticationStore = createStore(AuthenticationReducer, false, applyMiddleware(thunk));

export default AuthenticationStore;