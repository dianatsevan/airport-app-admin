import { handleActions } from 'redux-actions';
import * as actions from './actions';

const initialState = {
  luggageList: [],
  getLuggageListError: false,
};

const reducers = handleActions(
  {
    [actions.getLuggageList]: (state = initialState) => ({
      ...state
    }),
    [actions.setLuggageList]: (state = initialState, { payload }) => ({
      ...state,
      luggageList: payload
    }),
    [actions.getLuggageListError]: (state = initialState, { payload }) => ({
      ...state,
      getLuggageListError: payload
    }),
  },
  initialState
);

export default reducers;
