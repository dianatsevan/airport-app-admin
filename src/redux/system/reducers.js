import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

const initialState = {
  isLoggedInUser: false,
  isLoadingPage: false,
  isCheckingLoginData: false,
  isCheckingLoginDataError: false
};

const reducers = handleActions(
  {
    [actionTypes.CHECK_AUTH]: (state = initialState) => ({
      ...state
    }),
    [actionTypes.IS_LOGGED_IN_USER]: (state = initialState, { payload }) => ({
      ...state,
      isLoggedInUser: payload
    }),
    [actionTypes.IS_LOADING_PAGE]: (state = initialState, { payload }) => ({
      ...state,
      isLoadingPage: payload
    }),
    [actionTypes.LOGIN_USER]: (state = initialState) => ({
      ...state
    }),
    [actionTypes.IS_CHECKING_LOGIN_DATA]: (state = initialState, { payload }) => ({
      ...state,
      isCheckingLoginData: payload
    }),
    [actionTypes.IS_CHECKING_LOGIN_DATA_ERROR]: (state = initialState, { payload }) => ({
      ...state,
      isCheckingLoginDataError: payload
    })
  },
  initialState
);

export default reducers;
