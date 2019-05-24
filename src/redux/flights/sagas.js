import axios from 'axios';
import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { addFlightToDbError, setFlightsData, getFlightsDataError, setSelectedFlightData, getSelectedFlightDataError, setFlightOrdersData, getFlightOrdersDataError } from './actions';
import urls from '../../urls';
import actionTypes from './actionTypes';

function* getFlightsData() {
  try {
    const flightsData = yield call(() => axios.get(urls.flightsUrl));
    yield put(setFlightsData(flightsData.data));
    yield put(getFlightsDataError(false));
  } catch (err) {
    yield put(getFlightsDataError(true));
  }
}

function* getSelectedFlightData({ payload: id }) {
  try {
    const flightData = yield call(() => axios.get(`${urls.flightsUrl}/${id}`));
    yield put(setSelectedFlightData(flightData.data));
    yield put(getSelectedFlightDataError(false));
    yield getFlightsData();
  } catch (err) {
    yield put(getSelectedFlightDataError(true));
  }
}

function* getFlightOrdersData({ payload: id }) {
  try {
    const flightOrdersData = yield call(() => axios.get(`${urls.flightOrdersUrl}${id}`));
    yield put(setFlightOrdersData(flightOrdersData.data));
    yield put(getFlightOrdersDataError(false));
  } catch (err) {
    yield put(getFlightOrdersDataError(true));
  }
}

function* addFlightToDb({ payload }) {
  try {
    const dataToAdd = {
      ...payload,
      date: payload.departureDate,
      startTime: payload.departureTime,
      endTime: payload.arrivalTime
    };

    yield call(() => axios.post(urls.flightsUrl, dataToAdd));
    yield put(addFlightToDbError(false));
    yield getFlightsData();
  } catch (err) {
    yield put(addFlightToDbError(true));
  }
}

export default function* watchFlightData() {
  yield takeEvery(actionTypes.ADD_FLIGHT_TO_DB, addFlightToDb);
  yield takeLatest(actionTypes.GET_FLIGHTS_DATA, getFlightsData);
  yield takeLatest(actionTypes.GET_SELECTED_FLIGHT_DATA, getSelectedFlightData);
  yield takeLatest(actionTypes.GET_FLIGHT_ORDERS_DATA, getFlightOrdersData);
}
