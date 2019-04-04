import actionTypes from './actionTypes';

const initialState = {
  addAirport: {
    success: {},
    errored: false
  }
}

export default function airports(state = initialState, action) {
  switch (actionTypes) {
    case actionTypes.AIRPORTS_ADDING_SUCCESS:
      return {
        ...state,
        succes: action.airportInfo
      };
    case actionTypes.AIRPORT_ADDIND_ERRORED:
      return {
        ...state,
        errored: action.bool
      };
    default:
      return state;
  }
}
