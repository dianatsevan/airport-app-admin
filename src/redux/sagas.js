import { all } from 'redux-saga/effects';
import airportsSaga from './airports/sagas';
import planesSaga from './planes/sagas';
import flightsSaga from './flights/sagas';
import watchCheckAuthRequest from './system/sagas';
import luggageData from './luggage/sagas';

export default function* rootSaga() {
  yield all([
    airportsSaga(),
    planesSaga(),
    luggageData(),
    flightsSaga(),
    watchCheckAuthRequest()
  ]);
}
