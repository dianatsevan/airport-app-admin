import { createActions } from 'redux-actions';
import actionTypes from './actionTypes';

export const { addPlaneToDb, addPlaneToDbError, getPlanesData, setPlanesData, getPlanesDataError, editPlaneData, editPlaneDataError, deletePlane, deletePlaneError } = createActions({
  [actionTypes.ADD_PLANE_TO_DB]: null,
  [actionTypes.ADD_PLANE_TO_DB_ERROR]: null,
  [actionTypes.GET_PLANES_DATA]: null,
  [actionTypes.SET_PLANES_DATA]: null,
  [actionTypes.GET_PLANES_DATA_ERROR]: null,
  [actionTypes.EDIT_PLANE_DATA]: null,
  [actionTypes.EDIT_PLANE_DATA_ERROR]: null,
  [actionTypes.DELETE_PLANE]: null,
  [actionTypes.DELETE_PLANE_ERROR]: null
});
