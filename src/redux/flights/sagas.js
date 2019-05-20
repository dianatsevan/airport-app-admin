import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import { addFlightToDbError, setFlightsData, getFlightsDataError } from './actions';
import urls from '../../urls';
import actionTypes from './actionTypes';

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
  } catch (err) {
    yield put(addFlightToDbError(true));
  }
}

export default function* watchFlightData() {
  yield takeEvery(actionTypes.ADD_FLIGHT_TO_DB, addFlightToDb);
}
