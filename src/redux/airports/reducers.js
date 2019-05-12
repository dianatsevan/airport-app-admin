import { handleActions } from 'redux-actions';
import * as actions from './actions';

const initialState = {
  addedAirport: [],
  airportsList: [],
  airportsToAdd: [],
  addedAirports: [],
  getAirportsDataError: false,
  deleteAirportError: false,
  changeAirportError: false
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
      getAirportsDataError: payload
    }),
    [actions.setAirportsToAdd]: (state = initialState, { payload }) => ({
      ...state,
      airportsToAdd: payload
    }),
    [actions.addAirportsToDb]: (state = initialState) => ({
      ...state
    }),
    [actions.deleteAirport]: (state = initialState) => ({
      ...state
    }),
    [actions.deleteAirportError]: (state = initialState, { payload }) => ({
      ...state,
      deleteAirportError: payload
    }),
    [actions.changeAirport]: (state = initialState) => ({
      ...state
    }),
    [actions.changeAirportError]: (state = initialState, { payload }) => ({
      ...state,
      changeAirportError: payload
    })
  },
  initialState
);

export default reducer;
