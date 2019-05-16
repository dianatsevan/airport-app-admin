import { all, put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { urls } from '../../urls';
import actionTypes from './actionTypes';
import { setAirportsData, getAirportsDataError, setAirportsToAdd, deleteAirportError, changeAirportError } from './actions';

function* updateAirportData() {
  const newAirports = yield call(() => axios.get(urls.getAirportsUrl));

  yield put(setAirportsData(newAirports.data));
  yield put(getAirportsDataError(false));
}

function* fetchAirportsData({ payload }) {
  try {
    const airports = yield call(() => axios.get(urls.getAirportsUrl, {
      params: {
        orderBy: payload ? payload.orderBy : 'name',
        direction: payload ? payload.direction : 1
      }
    }));
    const airportsToAdd = yield call(() => axios.get(urls.getAirportsToAdd));

    yield put(setAirportsData(airports.data));
    yield put(setAirportsToAdd(airportsToAdd.data));
    yield put(getAirportsDataError(false));
  } catch (err) {
    yield put(getAirportsDataError(true));
  }
}

function* watchFetchData() {
  yield takeEvery(actionTypes.GET_AIRPORTS_DATA, fetchAirportsData);
}

function* addAirportsToDBsaga({ payload }) {
  try {
    yield call(() => axios.post(urls.addAirportToDb, payload));
    yield updateAirportData();
    yield put(getAirportsDataError(false));
  } catch (err) {
    yield put(getAirportsDataError(true));
  }
}

function* watchAirportsAdding() {
  yield takeEvery(actionTypes.ADD_AIRPORTS_TO_DB, addAirportsToDBsaga);
}

function* deleteAirportFromDB({ payload }) {
  try {
    const url = `${urls.addAirportToDb}/${payload}`;

    yield call(() => axios.delete(url));
    yield updateAirportData();
    yield put(deleteAirportError(false));
  } catch (err) {
    yield put(deleteAirportError(true));
  }
}

function* watchAirportDeleting() {
  yield takeEvery(actionTypes.DELETE_AIRPORT, deleteAirportFromDB);
}

function* changeAirport({ payload }) {
  try {
    const newUrl = `${urls.getAirportsUrl}/${payload.airportId}`;

    yield call(() => axios.put(newUrl, {
      code: payload.code,
      name: payload.airport
    }));
    yield updateAirportData();
    yield put(changeAirportError(false));
  } catch (err) {
    yield put(changeAirportError(true));
  }
}

function* watchAirportChanging() {
  yield takeEvery(actionTypes.CHANGE_AIRPORT, changeAirport);
}

export default function* airportsSaga() {
  yield all([
    watchFetchData(),
    watchAirportsAdding(),
    watchAirportDeleting(),
    watchAirportChanging()
  ]);
}
