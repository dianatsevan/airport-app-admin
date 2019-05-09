import { all, put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { urls } from '../../urls';
import actionTypes from './actionTypes';
import { setAirportsData, getAirportsDataError, setAirportsToAdd, deleteAirportError } from './actions';

function* fetchAirportsData() {
  try {
    const data = yield call(() => axios.get(urls.getAirportsUrl));

    return yield put(setAirportsData(data.data));
  } catch (err) {
    return yield put(getAirportsDataError(true));
  }
}

function* fetchAirportsToAddData() {
  try {
    const data = yield call(() => axios.get(urls.getAirportsToAdd));

    return yield put(setAirportsToAdd(data.data));
  } catch (err) {
    return yield put(getAirportsDataError(true));
  }
}

function* watchFetchData() {
  yield takeEvery(actionTypes.GET_AIRPORTS_DATA, fetchAirportsData);
  yield takeEvery(actionTypes.GET_AIRPORTS_DATA, fetchAirportsToAddData);
}

function* addAirportsToDBsaga(action) {
  try {
    yield call(() => axios.post(urls.addAirportToDb, action.payload));
    const newAirports = yield call(() => axios.get(urls.getAirportsUrl));
    yield put(setAirportsData(newAirports.data));
  } catch (err) {
    yield put(getAirportsDataError(true));
  }
}

function* watchAirportsAdding() {
  yield takeEvery(actionTypes.ADD_AIRPORTS_TO_DB, addAirportsToDBsaga);
}

function* deleteAirportFromDB(action) {
  try {
    const url = `${urls.addAirportToDb}/${action.payload}`;
    yield call(() => axios.delete(url));
    const newAirports = yield call(() => axios.get(urls.getAirportsUrl));
    yield put(setAirportsData(newAirports.data));
  } catch (err) {
    yield put(deleteAirportError(true));
  }
}

function* watchAirportDeleting() {
  yield takeEvery(actionTypes.DELETE_AIRPORT, deleteAirportFromDB);
}

export default function* airportsSaga() {
  yield all([
    watchFetchData(),
    watchAirportsAdding(),
    watchAirportDeleting()
  ]);
}
