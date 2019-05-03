import { createActions } from 'redux-actions';
import actionTypes from './actionTypes';

export const checkAuthentication = () => {
  return {
    type: actionTypes.AUTHORIZE_USER
  }
};

export const { setUserLoginStatus } = createActions({
  [actionTypes.IS_LOADING_PAGE]: bool => bool,
  [actionTypes.IS_LOGGED_IN_USER]: bool => bool,
});