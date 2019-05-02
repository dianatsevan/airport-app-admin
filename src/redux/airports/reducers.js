import { handleActions } from 'redux-actions';
import * as actions from './actions';

const initialState = {
  addedAirport: {},
  airportsList: [],
  airportsToAdd: [],
  error: false
}

const reducer = handleActions(
  {
    [actions.setAirportsData]: (state = initialState, { airportsList }) => {
      return {
        ...state,
        airportsList
      }
    },
    [actions.getAirportsDataError]: (state = initialState, { bool }) => {
      return {
        ...state,
        error: bool
      }
    },
    [actions.setAirportsToAdd]: (state = initialState, { airportsToAdd }) => {
      return {
        ...state,
        airportsToAdd
      }
    }
  },
  initialState
);

export default reducer;