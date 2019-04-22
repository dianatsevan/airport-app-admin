import { handleActions } from 'redux-actions';
import * as actions from './actions';

const initialState = {
  addedAirport: {},
  airportsList: [],
  error: false
}

const reducer = handleActions(
  {
    [actions.setAirportsData]: (state = initialState, { airportsList }) => {
      return {
        ...state,
        airportsList: airportsList
      }
    },
    [actions.getAirportsDataError]: (state = initialState, { bool }) => {
      return {
        ...state,
        error: bool
      }
    }
  },
  initialState
);

export default reducer;