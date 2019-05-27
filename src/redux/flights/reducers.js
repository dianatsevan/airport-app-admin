import { handleActions } from 'redux-actions';
import * as actions from './actions';

const initialState = {
  addFlightToDbError: false,
  FlightsList: [],
  getFlightsDataError: false,
  editFlightDataError: false,
  deleteFlightError: false
};

const reducers = handleActions(
  {
    [actions.addFlightToDb]: (state = initialState) => ({
      ...state
    }),
    [actions.addFlightToDbError]: (state = initialState, { payload }) => ({
      ...state,
      addFlightToDbError: payload
    }),
    [actions.getFlightsData]: (state = initialState) => ({
      ...state
    }),
    [actions.setFlightsData]: (state = initialState, { payload }) => ({
      ...state,
      FlightsList: payload
    }),
    [actions.getFlightsDataError]: (state = initialState, { payload }) => ({
      ...state,
      getFlightsDataError: payload
    }),
  },
  initialState
);

export default reducers;
