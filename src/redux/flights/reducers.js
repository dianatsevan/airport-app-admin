import { handleActions } from 'redux-actions';
import * as actions from './actions';
import actionTypes from './actionTypes';

const initialState = {
  addFlightToDbError: false,
  flightsList: [],
  selectedFlight: {},
  flightOrders: [],
  getFlightsDataError: false,
  getSelectedFlightDataError: false,
  editFlightDataError: false,
  deleteFlightError: false,
  getFlightOrdersDataError: false
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
    [actions.getFlightOrdersData]: (state = initialState) => ({
      ...state
    }),
    [actions.setFlightOrdersData]: (state = initialState, { payload }) => ({
      ...state,
      flightOrders: payload
    }),
    [actions.getFlightOrdersDataError]: (state = initialState, { payload }) => ({
      ...state,
      getFlightOrdersDataError: payload
    }),
    [actions.deleteFlight]: (state = initialState) => ({
      ...state
    }),
    [actions.deleteFlightError]: (state = initialState, { payload }) => ({
      ...state,
      deleteFlightError: payload
    })
  },
  initialState
);

export default reducers;
