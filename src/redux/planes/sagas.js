import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import { addPlaneToDbError, setPlanesData, getPlanesDataError, editPlaneDataError, deletePlaneError } from './actions';
import { enqueueSnackbar } from '../notifier/actions';
import urls from '../../urls';
import actionTypes from './actionTypes';

function* getPlanesData() {
  try {
    const planes = yield call(() => axios.get(urls.getPlanesList));
    const flights = yield call(() => axios.get(urls.flightsUrl));
    planes.data.forEach(plane => {
      plane.isUsedByFlights = flights.data.some(({ planeInfo }) => planeInfo._id === plane._id);
    });
    yield put(setPlanesData(planes.data));
    yield put(getPlanesDataError(false));
  } catch (err) {
    yield put(getPlanesDataError(true));
  }
}

function* addPlaneToDb({ payload }) {
  try {
    yield call(() => axios.post(urls.addPlaneToDb, payload));
    yield put(addPlaneToDbError(false));
    yield put(enqueueSnackbar({ message: 'Added', variant: 'success' }));
    yield getPlanesData();
  } catch (err) {
    yield put(addPlaneToDbError(true));
    yield put(enqueueSnackbar({ message: err.response.data, variant: 'error' }));
  }
}

function* editPlaneData({ payload }) {
  try {
    const newUrl = `${urls.getPlanesList}/${payload.id}`;
    yield call(() => axios.put(newUrl, { ...payload }));
    yield put(editPlaneDataError(false));
    yield put(enqueueSnackbar({ message: 'Saved', variant: 'success' }));
    yield getPlanesData();
  } catch (err) {
    yield put(editPlaneDataError(true));
    yield put(enqueueSnackbar({ message: err.response.data, variant: 'error' }));
  }
}

function* deletePlane({ payload: id }) {
  try {
    const newUrl = `${urls.getPlanesList}/${id}`;
    yield call(() => axios.delete(newUrl));
    yield getPlanesData();
    yield put(deletePlaneError(false));
  } catch (err) {
    yield put(deletePlaneError(true));
    yield put(enqueueSnackbar({ message: err.response.data, variant: 'error' }));
  }
}

export default function* watchPlaneData() {
  yield takeEvery(actionTypes.ADD_PLANE_TO_DB, addPlaneToDb);
  yield takeEvery(actionTypes.GET_PLANES_DATA, getPlanesData);
  yield takeEvery(actionTypes.EDIT_PLANE_DATA, editPlaneData);
  yield takeEvery(actionTypes.DELETE_PLANE, deletePlane);
}
