import { SET_AUTHENTICATION, SET_AUTHENTICATION_NOT, SET_AUTHENTICATION_NOT_USER, AUTH_LOGIN_OUT } from '../action/AuthenticationAction.js';

const AuthenticationReducer = (state, action) => {
  switch (action.type) {
    case SET_AUTHENTICATION:
      return {
        user: {...action.user},
        status: 1,
      };

    case SET_AUTHENTICATION_NOT:
      return {
        user: false,
        state: action.state,
        status: 2,
      };

    case SET_AUTHENTICATION_NOT_USER:
      return {
        user: false,
        status: 3,
      };

    case AUTH_LOGIN_OUT:
      return false;

    default:
      return state;
  }
};

export default AuthenticationReducer;