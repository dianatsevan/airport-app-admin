import { createActions } from 'redux-actions';
import actionTypes from './actionTypes';

export const checkAuthentication = () => ({ type: actionTypes.AUTHORIZE_USER });

export const { setLoadingStatus, setUserLoginStatus } = createActions({
  [actionTypes.IS_LOADING_PAGE]: bool => bool,
  [actionTypes.IS_LOGGED_IN_USER]: bool => bool,
});
