import { handleActions } from 'redux-actions';
import * as actions from './actions';

const initialState = {
  addFlightToDbError: false,
  flightsList: [],
  selectedFlight: {},
  getFlightsDataError: false,
  getSelectedFlightDataError: false,
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
      flightsList: payload
    }),
    [actions.getFlightsDataError]: (state = initialState, { payload }) => ({
      ...state,
      getFlightsDataError: payload
    }),
    [actions.getSelectedFlightData]: (state = initialState) => ({
      ...state
    }),
    [actions.setSelectedFlightData]: (state = initialState, { payload }) => ({
      ...state,
      selectedFlight: payload
    }),
    [actions.getSelectedFlightDataError]: (state = initialState, { payload }) => ({
      ...state,
      getSelectedFlightDataError: payload
    }),
  },
  initialState
);

export default reducers;
