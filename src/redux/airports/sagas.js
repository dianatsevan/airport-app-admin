import { all, put, call, take, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { urls } from '../../urls';
import actionTypes from './actionTypes';
import { setAirportsData, getAirportsDataError, setAirportsToAdd, deleteAirportError, changeAirportError } from './actions';
import { enqueueSnackbar } from '../notifier/actions';

function* findUsedAirports(airports) {
  try {
    const flightsData = yield call(() => axios.get(urls.flightsUrl));
    airports.data.forEach(airport => {
      airport.isUsedByFlights = flightsData.data.some((flight) => flight.fromCountry._id === airport._id || flight.toCountry._id === airport._id);
    });
    return airports;
  } catch (err) {
    return airports;
  }
}

function* updateAirportData() {
  const airports = yield call(() => axios.get(urls.getAirportsUrl));
  const newAirports = yield findUsedAirports(airports);

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
    const newAirports = yield findUsedAirports(airports);
    yield put(setAirportsData(newAirports.data));
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

function* addAirportsToDB({ payload }) {
  try {
    yield call(() => axios.post(urls.addAirportToDb, payload));
    yield put(getAirportsDataError(false));
    yield put(enqueueSnackbar({ message: 'Added', variant: 'success' }));
    yield updateAirportData();
  } catch (err) {
    yield put(getAirportsDataError(true));
    yield put(enqueueSnackbar({ message: err.response.data, variant: 'error' }));
  }
}

function* changeAirport({ payload }) {
  try {
    const newUrl = `${urls.getAirportsUrl}/${payload.airportId}`;

    yield call(() => axios.put(newUrl, {
      code: payload.code,
      name: payload.airportName
    }));
    yield put(enqueueSnackbar({ message: 'Saved', variant: 'success' }));
    yield updateAirportData();
    yield put(changeAirportError(false));
  } catch (err) {
    yield put(enqueueSnackbar({ message: err.response.data, variant: 'error' }));
    yield put(changeAirportError(true));
  }
}

function* deleteAirportFromDB({ payload }) {
  try {
    const url = `${urls.addAirportToDb}/${payload}`;
    yield call(() => axios.delete(url));
    yield updateAirportData();
    yield put(deleteAirportError(false));
  } catch (err) {
    yield put(enqueueSnackbar({ message: err.response.data, variant: 'error' }));
    yield put(deleteAirportError(true));
  }
}

export default function* watchFetchData() {
  yield takeEvery(actionTypes.GET_AIRPORTS_DATA, fetchAirportsData);
  yield takeEvery(actionTypes.GET_AIRPORTS_TO_ADD, fetchAirportToAddData);
  yield takeEvery(actionTypes.ADD_AIRPORTS_TO_DB, addAirportsToDB);
  yield takeEvery(actionTypes.DELETE_AIRPORT, deleteAirportFromDB);
  yield takeEvery(actionTypes.CHANGE_AIRPORT, changeAirport);
}
