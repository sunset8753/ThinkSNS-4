import AuthenticationFetch from '../fetch/AuthenticationFetch.js';

const SET_AUTHENTICATION = 'SET';
const setAuthentication = (user = false) => {
  return {
    type: SET_AUTHENTICATION,
    user,
  };
};

const SET_AUTHENTICATION_NOT = 'SET_AUTHENTICATION_NOT';
const notAuthentication = (state) => ({
  type: SET_AUTHENTICATION_NOT,
  state,
});

const SET_AUTHENTICATION_NOT_USER = 'SET_AUTHENTICATION_NOT_USER';
const notAuthenticationUser = () => ({
  type: SET_AUTHENTICATION_NOT_USER,
});

const AUTH_LOGIN_OUT = 'AUTH_LOGIN_OUT';
const authLoginOut = () => ({
  type: AUTH_LOGIN_OUT
});

const setAuthenticationAsync = () => {
  return dispatch => AuthenticationFetch(dispatch);
};

export {
  SET_AUTHENTICATION, SET_AUTHENTICATION_NOT, AUTH_LOGIN_OUT,
  setAuthentication, notAuthentication,
  setAuthenticationAsync, authLoginOut,
};
export default setAuthentication;