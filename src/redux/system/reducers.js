import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

const initialState = {
  isLoggedInUser: false,
  isLoadingPage: false
};

const reducers = handleActions(
  {
    [actionTypes.IS_LOGGED_IN_USER]: (state = initialState, { bool }) => {
      return {
        ...state,
        isLoggedInUser: bool
      }
    },
    [actionTypes.IS_LOADING_PAGE]: (state = initialState, { bool }) => {
      return {
        ...state,
        isLoadingPage: bool
      }
    }
  },
  initialState
);

export default reducers;