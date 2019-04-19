import { all, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { fetchAirportsData, error } from './actions';
// import actionTypes from './airports/actionTypes';

export function* fetchAirportaData() {
  try {
    const data = yield call(() => axios.get('http://localhost:3001/airports'));
    yield console.log(data);
    yield put(fetchAirportsData(data));
  } catch (err) {
    put(error(true));
    console.log(err);
  }
}

export function* rootSaga() {
  yield all([
    fetchAirportaData()
  ]);
}