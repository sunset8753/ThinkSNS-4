const NOTIFICATION_SEND = 'SEND';
const createSendNotificationAction = (message, settings = {}) => ({
  type: NOTIFICATION_SEND,
  message: message,
  settings,
});

const NOTIFICATION_CLOSE = 'CLOSE';
const createCloseNotifcationAction = (settings = {}) => ({
  type: NOTIFICATION_CLOSE,
  settings,
});


const closeNotifcationAction = () => (
  dispatch => dispatch(createCloseNotifcationAction({
    visible: false,
  }))
);

const sendNotificationAction = (message, settings = {}) => (
  dispatch => dispatch(createSendNotificationAction(message ,{
    ...settings,
    visible: true,
  }))
);

export {
  NOTIFICATION_SEND, NOTIFICATION_CLOSE,
  createSendNotificationAction, createCloseNotifcationAction,
  closeNotifcationAction, sendNotificationAction,
};