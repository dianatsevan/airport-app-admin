import { createActions } from 'redux-actions';
import actionTypes from './actionTypes';

export const { getAirportsData, setAirportsData, getAirportsDataError, setAirportsToAdd, addAirportsToDb } = createActions({
  [actionTypes.GET_AIRPORTS_DATA]: null,
  [actionTypes.SET_AIRPORTS_DATA]: null,
  [actionTypes.GET_AIRPORTS_DATA_ERROR]: null,
  [actionTypes.SET_AIRPORTS_TO_ADD]: null,
  [actionTypes.ADD_AIRPORTS_TO_DB]: null
});
