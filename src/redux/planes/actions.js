import { createActions } from 'redux-actions';
import actionTypes from './actionTypes';

export const { addPlaneToDb, addPlaneToDbError } = createActions({
  [actionTypes.ADD_PLANE_TO_DB]: null,
  [actionTypes.ADD_PLANE_TO_DB_ERROR]: null
});
