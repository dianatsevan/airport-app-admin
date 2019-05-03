import { all } from 'redux-saga/effects';
import { watchCheckAuthRequest } from './user/sagas';


export function* rootSaga() {
  yield all([
    watchCheckAuthRequest()
  ]);
}