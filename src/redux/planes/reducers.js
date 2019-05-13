import { handleActions } from 'redux-actions';
import * as actions from './actions';

const initialState = {
  addPlaneToDbError: false
};

const reducers = handleActions(
  {
    [actions.addPlaneToDb]: (state = initialState) => ({
      ...state
    }),
    [actions.addPlaneToDbError]: (state = initialState, { payload }) => ({
      ...state,
      addPlaneToDbError: payload
    })
  },
  initialState
);

export default reducers;
