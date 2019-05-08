import { handleActions } from 'redux-actions';
import * as actions from './actions';

const initialState = {
  addedAirport: [],
  airportsList: [],
  airportsToAdd: [],
  addedAirports: [],
  error: false
};

const reducer = handleActions(
  {
    [actions.getAirportsData]: (state = initialState) => ({
      ...state
    }),
    [actions.setAirportsData]: (state = initialState, { payload }) => ({
      ...state,
      airportsList: payload
    }),
    [actions.getAirportsDataError]: (state = initialState, { payload }) => ({
      ...state,
      error: payload
    }),
    [actions.setAirportsToAdd]: (state = initialState, { payload }) => ({
      ...state,
      airportsToAdd: payload
    }),
    [actions.addAirportsToDb]: (state = initialState, { payload }) => ({
      ...state,
      addedAirports: payload
    })
  },
  initialState
);

export default reducer;
