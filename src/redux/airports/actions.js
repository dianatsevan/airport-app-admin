import { createActions } from 'redux-actions';
import actionTypes from './actionTypes';

export const { getAirportsData, setAirportsData, getAirportsDataError, getAirportsToAdd, setAirportsToAdd, addAirportsToDb, deleteAirport, deleteAirportError, changeAirport, changeAirportError } = createActions({
  [actionTypes.GET_AIRPORTS_DATA]: null,
  [actionTypes.SET_AIRPORTS_DATA]: null,
  [actionTypes.GET_AIRPORTS_DATA_ERROR]: null,
  [actionTypes.GET_AIRPORTS_TO_ADD]: null,
  [actionTypes.SET_AIRPORTS_TO_ADD]: null,
  [actionTypes.ADD_AIRPORTS_TO_DB]: null,
  [actionTypes.DELETE_AIRPORT]: null,
  [actionTypes.DELETE_AIRPORT_ERROR]: null,
  [actionTypes.CHANGE_AIRPORT]: null,
  [actionTypes.CHANGE_AIRPORT_ERROR]: null
});
