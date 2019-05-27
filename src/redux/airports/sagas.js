import { all, put, call, take, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { urls } from '../../urls';
import actionTypes from './actionTypes';
import { setAirportsData, getAirportsDataError, setAirportsToAdd, deleteAirportError, changeAirportError } from './actions';
import { enqueueSnackbar } from '../notifier/actions';

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

    yield put(setAirportsData(airports.data));
    yield put(getAirportsDataError(false));
  } catch (err) {
    yield put(getAirportsDataError(true));
  }
}

function* fetchAirportToAddData() {
  try {
    const airportsToAdd = yield call(() => axios.get(urls.getAirportsToAdd));
    yield put(setAirportsToAdd(airportsToAdd.data));
    yield put(getAirportsDataError(false));
  } catch (err) {
    yield put(getAirportsDataError(true));
  }
}

function* addAirportsToDBsaga({ payload }) {
  try {
    yield call(() => axios.post(urls.addAirportToDb, payload));
    yield updateAirportData();
    yield put(getAirportsDataError(false));
    yield put(enqueueSnackbar({
      message: 'Airport was added',
      options: {
        variant: 'success'
      }
    }));
  } catch (err) {
    yield put(getAirportsDataError(true));
    yield put(enqueueSnackbar({
      message: 'Something was wrong...',
      options: {
        variant: 'success'
      }
    }));
  }
}

function* deleteAirportFromDB({ payload }) {
  try {
    const url = `${urls.addAirportToDb}/${payload}`;
    const fromCountryFlights = yield call(() => axios.get(`${urls.flightsUrl}?fromCountry=${payload}`));
    const toCountryFlights = yield call(() => axios.get(`${urls.flightsUrl}?toCountry=${payload}`));

    if (fromCountryFlights.data.length || toCountryFlights.data.length) {
      yield put(enqueueSnackbar({
        message: 'Airport has already used in flights',
        options: {
          variant: 'info'
        }
      }));
    } else {
      yield call(() => axios.delete(url));
      yield updateAirportData();
      yield put(deleteAirportError(false));
      yield put(enqueueSnackbar({
        message: 'Airport was deleted',
        options: {
          variant: 'success'
        }
      }));
    }
  } catch (err) {
    yield put(deleteAirportError(true));
    yield put(enqueueSnackbar({
      message: 'Something was wrong...',
      options: {
        variant: 'success'
      }
    }));
  }
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

export default function* watchFetchData() {
  yield takeEvery(actionTypes.GET_AIRPORTS_DATA, fetchAirportsData);
  yield takeEvery(actionTypes.GET_AIRPORTS_TO_ADD, fetchAirportToAddData);
  yield takeEvery(actionTypes.ADD_AIRPORTS_TO_DB, addAirportsToDBsaga);
  yield takeEvery(actionTypes.DELETE_AIRPORT, deleteAirportFromDB);
  yield takeEvery(actionTypes.CHANGE_AIRPORT, changeAirport);
}
