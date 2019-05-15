import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import { addPlaneToDbError, setPlanesData, getPlanesDataError, editPlaneDataError } from './actions';
import urls from '../../urls';
import actionTypes from './actionTypes';

function* getPlanesData() {
  try {
    const planes = yield call(() => axios.get(urls.getPlanesList));
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
    yield getPlanesData();
  } catch (err) {
    yield put(addPlaneToDbError(true));
  }
}

function* editPlaneData({ payload }) {
  try {
    const newUrl = `${urls.getPlanesList}/${payload.id}`;
    yield call(() => axios.put(newUrl, { ...payload }));
    yield put(editPlaneDataError(false));
    yield getPlanesData();
  } catch (err) {
    yield put(editPlaneDataError(true));
  }
}

export default function* watchPlaneData() {
  yield takeEvery(actionTypes.ADD_PLANE_TO_DB, addPlaneToDb);
  yield takeEvery(actionTypes.GET_PLANES_DATA, getPlanesData);
  yield takeEvery(actionTypes.EDIT_PLANE_DATA, editPlaneData);
}
