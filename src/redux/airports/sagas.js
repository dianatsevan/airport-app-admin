import { all, put, call, takeEvery } from 'redux-saga/effects';
import { urls } from '../../urls';
import actionTypes from './actionTypes';
import axios from 'axios';

function* fetchAirportsData() {
  try {
    const data = yield call(() => axios.get(urls.getAirportsUrl));

    return yield put({ type: actionTypes.SET_AIRPORTS_DATA, airportsList: data.data });
  } catch (err) {
    return yield put({ type: actionTypes.GET_AIRPORTS_DATA_ERROR, bool: true});
  }
}

function* fetchAir() {
  try {
    const data = yield call(() => axios.get(urls.getAirportsToAdd));

    return yield put({ type: actionTypes.SET_AIRPORTS_TO_ADD, airportsToAdd: data.data });
  } catch (err) {
    return yield put({ type: actionTypes.GET_AIRPORTS_DATA_ERROR, bool: true});
  }
}

function* watchFetchData() {
  yield takeEvery(actionTypes.GET_AIRPORTS_DATA, fetchAirportsData);
  yield takeEvery(actionTypes.GET_AIRPORTS_DATA, fetchAir);
}

export function* airportsSaga() {
  yield all([
    watchFetchData()
  ]);
}