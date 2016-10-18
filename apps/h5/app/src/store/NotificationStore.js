import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import NotificationReducer from '../reducer/NotificationReducer.js';

const defaultSettings = {
  settings: {
    visible: false,
  },
};
const NotificationStore = createStore(NotificationReducer, defaultSettings, applyMiddleware(thunk));

export default NotificationStore;