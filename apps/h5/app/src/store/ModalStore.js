import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ModalReducer from '../reducer/ModalReducer.js';

const ModalStore = createStore(ModalReducer, applyMiddleware(thunk));

export default ModalStore;