import { createActions } from 'redux-actions';
import actionTypes from './actionTypes';

export const { checkAuth, isLoadingPage, isLoggedInUser, loginUser, isCheckingLoginData, isCheckingLoginDataError } = createActions({
  [actionTypes.CHECK_AUTH]: null,
  [actionTypes.IS_LOADING_PAGE]: null,
  [actionTypes.IS_LOGGED_IN_USER]: null,
  [actionTypes.LOGIN_USER]: null,
  [actionTypes.IS_CHECKING_LOGIN_DATA]: null,
  [actionTypes.IS_CHECKING_LOGIN_DATA_ERROR]: null
});
