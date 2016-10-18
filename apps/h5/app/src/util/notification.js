import NotificationStore from '../store/NotificationStore.js';
import { createSendNotificationAction, createCloseNotifcationAction } from '../action/NotificationAction.js';

class notification {
  static send(message, settings = {}) {
    NotificationStore.dispatch(createSendNotificationAction(message, {...settings, visible: true}));
  }

  static close(settings = {}) {
    NotificationStore.dispatch(createCloseNotifcationAction({...settings, visible: false}));
  }

  static durationSend(message, duration = 3000, send_settings = {}, close_settings = {}) {
    sendNotification(message, send_settings);
    setTimeout(() => closeNotifcation(close_settings), duration);
  }
}

const sendNotification = notification.send;
const closeNotifcation = notification.close;
const durationSendNotification = notification.durationSend;

export { sendNotification, closeNotifcation, durationSendNotification };
export default notification;