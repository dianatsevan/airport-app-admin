import axios from 'axios';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { addPlaneToDbError } from './actions';
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

export default function* planesSaga() {
  yield all([
    watchPlaneAdding()
  ]);
}
