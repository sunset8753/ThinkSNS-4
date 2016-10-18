import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import StoreListReducer from '../reducer/StoreListReducer.js';

export const createStoreList = (defaultData = []) => createStore(StoreListReducer, defaultData, applyMiddleware(thunk));
