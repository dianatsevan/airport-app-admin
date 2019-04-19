import actionTypes from './actionTypes';

const initialState = {
  addedAirport: {},
  airports: [],
  error: false
}

export default function airports(state = initialState, action) {
  switch (actionTypes) {
    case actionTypes.AIRPORTS_ADDING_SUCCESS:
      return {
        ...state,
        addedAirport: action.airportInfo
      };
    case actionTypes.AIRPORTS_RECEIVE_DATA:
      return {
        ...state,
        airports: action.airports
      }
    case 'FETCH_AIRPORTS_DATA':
      return {
        ...state,
        airports: action.airports
      }
    case 'ERROR':
      return {
        ...state,
        error: action.bool
      }
    default:
      return state;
  }
}
