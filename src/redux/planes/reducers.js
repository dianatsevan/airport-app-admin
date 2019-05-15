import { handleActions } from 'redux-actions';
import * as actions from './actions';

const initialState = {
  addPlaneToDbError: false,
  planesList: [],
  getPlanesDataError: false,
  editPlaneDataError: false
};

const reducers = handleActions(
  {
    [actions.addPlaneToDb]: (state = initialState) => ({
      ...state
    }),
    [actions.addPlaneToDbError]: (state = initialState, { payload }) => ({
      ...state,
      addPlaneToDbError: payload
    }),
    [actions.getPlanesData]: (state = initialState) => ({
      ...state
    }),
    [actions.setPlanesData]: (state = initialState, { payload }) => ({
      ...state,
      planesList: payload
    }),
    [actions.getPlanesDataError]: (state = initialState, { payload }) => ({
      ...state,
      getPlanesDataError: payload
    }),
    [actions.editPlaneData]: (state = initialState) => ({
      ...state
    }),
    [actions.editPlaneDataError]: (state = initialState, { payload }) => ({
      ...state,
      editPlaneDataError: payload
    })
  },
  initialState
);

export default reducers;
