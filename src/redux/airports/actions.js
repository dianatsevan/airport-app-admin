import { createActions } from 'redux-actions';
import actionTypes from './actionTypes';

export const { getAirportsData, setAirportsData, getAirportsDataError, setAirportsToAdd } = createActions({
  [actionTypes.GET_AIRPORTS_DATA]: null,
  [actionTypes.SET_AIRPORTS_DATA]: airportsList => airportsList,
  [actionTypes.GET_AIRPORTS_DATA_ERROR]: bool => bool,
  [actionTypes.SET_AIRPORTS_TO_ADD]: airportsToAdd => airportsToAdd
});
