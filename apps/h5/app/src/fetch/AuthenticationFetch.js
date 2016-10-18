import request from 'superagent';
import { setAuthentication, notAuthentication, authLoginOut } from '../action/AuthenticationAction.js';
import buildURL from '../util/build-url.js';
import { durationSendNotification } from '../util/notification.js';
import store from '../store/AuthenticationStore.js';

const fn = (dispatch, error, response) => {

  if (error !== null) {
    durationSendNotification(error);
    AuthenticationFetch(dispatch);

    return ;
  }

  let { status, data } = response.body;

  if (status === 1) {
    dispatch(setAuthentication(data));
  } else {
    dispatch(notAuthentication(data));
  }
};

const AuthenticationFetch = (dispatch, time = 1500) => {
  const url = buildURL('login', 'base');
  // 故意增加延迟。
  // 你问我为啥故意增加？状态更新太快的话，转场动画非列队的，所以，你懂了吧？
  setTimeout(() => {
    request
      .get(url)
      .end((error, response) => fn(dispatch, error, response));
  }, time);
};

const AuthLoginOut = ({error_message = null, success_message = null} = {}) => {
  const url = buildURL('login', 'out');
  request
    .get(url)
    .end((error, response) => {
      if (error !== null) {
        durationSendNotification(error_message || error);

        return ;
      }

      durationSendNotification(success_message || response.body.message);
      // store.dispatch(authLoginOut());
      AuthenticationFetch(store.dispatch, 10);
      // console.log(store.dispatch(authLoginOut()));
    });
};

export {
  AuthenticationFetch, AuthLoginOut
};

export default AuthenticationFetch;