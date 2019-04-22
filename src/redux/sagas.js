import { all } from 'redux-saga/effects';
import { airportsSaga } from './airports/sagas';

export function* rootSaga() {
  yield all([
    airportsSaga()
  ]);
}