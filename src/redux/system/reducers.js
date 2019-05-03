import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

const initialState = {
  isLoggedInUser: false,
  isLoadingPage: false
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
    [actionTypes.LOGIN_USER]: (state = initialState, { payload }) => ({
      ...state,
      payload
    })
  },
  initialState
);

export default reducers;
