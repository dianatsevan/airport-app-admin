import actionTypes from './actionTypes';

const initialState = {
  addedAirport: {}
}

export default function airports(state = initialState, action) {
  switch (actionTypes) {
    case actionTypes.AIRPORTS_ADDING_SUCCESS:
      return {
        ...state,
        addedAirport: action.airportInfo
      };
    default:
      return state;
  }
}
