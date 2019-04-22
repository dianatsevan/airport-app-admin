import { all, put, call, take } from 'redux-saga/effects';
import axios from 'axios';
import actionTypes from './actionTypes';

export function* fetchAirportaData() {
  try {
    yield take(actionTypes.GET_AIRPORTS_DATA);
    const data = yield call(() => axios.get('http://localhost:3001/airports'));
    yield console.log(data);
    yield console.log(actionTypes.GET_AIRPORTS_DATA);
    yield put({ type: actionTypes.SET_AIRPORTS_DATA, airports: data.data });
  } catch (err) {
    // yield put(error(true));
    console.log(err);
  }
}

export function* rootSaga() {
  yield all([
    fetchAirportaData()
  ]);
}