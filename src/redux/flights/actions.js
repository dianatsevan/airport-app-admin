import { createActions } from 'redux-actions';
import actionTypes from './actionTypes';

export const { addFlightToDb, addFlightToDbError, getFlightsData, setFlightsData, getFlightsDataError } = createActions({
  [actionTypes.ADD_FLIGHT_TO_DB]: null,
  [actionTypes.ADD_FLIGHT_TO_DB_ERROR]: null,
  [actionTypes.GET_FLIGHTS_DATA]: null,
  [actionTypes.SET_FLIGHTS_DATA]: null,
  [actionTypes.GET_FLIGHTS_DATA_ERROR]: null,
});
