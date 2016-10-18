import request from 'superagent';
import { setAuthentication, notAuthentication, notAuthenticationUser } from '../action/AuthenticationAction.js';
import buildURL from '../util/build-url.js';
import { durationSendNotification } from '../util/notification.js';

let interval;
let sending = false;

const fn = ({dispatch, routerGo, error = null, response = null}) => {
  if (error !== null) {
    durationSendNotification(error);
  }

  let { status, data } = response.body;

  if (status === 1) {
    LoginSyncFetchClear();
    dispatch(setAuthentication(data));
    routerGo();
  } else if (status === 2) {
    dispatch(notAuthenticationUser());
  }

  sending = false;
};

const fetchData = (dispatch, state, routerGo) => {
  let url = buildURL('login', 'sync');
  request
    .post(url)
    .field('state', state)
    .end((error, response) => fn({dispatch, error, response, routerGo}))
};

const LoginSyncFetch = (store, routerGo) => {
  interval = setInterval(() => {
    if (sending === false) {
      let { state } = store.getState();
      sending = true;
      fetchData(store.dispatch, state, routerGo);
    }
  }, 2000);
};

const LoginSyncFetchClear = () => clearInterval(interval);

export {
  LoginSyncFetchClear, LoginSyncFetch,
};
