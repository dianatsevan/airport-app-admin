import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';
import * as actions from './actions';

const initialState = {
  addedAirport: {},
  airports: [],
  error: false
}

// export default function airports(state = initialState, action) {
//   switch (action.type) {
//     case actionTypes.SET_AIRPORTS_DATA:
//       return {
//         ...state,
//         airports: action.airports
//       }
//     default:
//       return state;
//   }
// }

const reducer = handleActions(
  {
    [actions.setAirportsData]: (state = initialState, airports) => {
      return {
        ...state,
        airports: airports
      }
    }
  },
  initialState
);

export default reducer;