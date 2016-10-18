import { NOTIFICATION_SEND, NOTIFICATION_CLOSE } from '../action/NotificationAction.js';

const NotificationReducer = (state, action) => {
  switch(action.type) {
    case NOTIFICATION_SEND:
      return {
        ...state,
        settings: action.settings,
        message: action.message,
      };

    case NOTIFICATION_CLOSE:
      return {
        ...state,
        settings: action.settings,
        message: '',
      };

    default:
      return state;
  }
};

export default NotificationReducer;