import axios from 'axios';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { addPlaneToDbError, setPlanesData, getPlanesDataError } from './actions';
import urls from '../../urls';
import actionTypes from './actionTypes';

function* addPlaneToDb({ payload }) {
  try {
    yield call(() => axios.post(urls.addPlaneToDb, payload));
    yield put(addPlaneToDbError(false));
  } catch (err) {
    yield put(addPlaneToDbError(true));
  }
}

function* watchPlaneAdding() {
  yield takeEvery(actionTypes.ADD_PLANE_TO_DB, addPlaneToDb);
}

function* getPlanesData() {
  try {
    const planes = yield call(() => axios.get(urls.getPlanesList));
    yield put(setPlanesData(planes.data));
    yield put(getPlanesDataError(false));
  } catch (err) {
    yield put(getPlanesDataError(true));
  }
}

function* watchPlanesListGetting() {
  yield takeEvery(actionTypes.GET_PLANES_DATA, getPlanesData);
}

export default function* planesSaga() {
  yield all([
    watchPlaneAdding(),
    watchPlanesListGetting()
  ]);
}
