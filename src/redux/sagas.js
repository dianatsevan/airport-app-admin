import { all } from 'redux-saga/effects';
import watchCheckAuthRequest from './system/sagas';


export default function* rootSaga() {
  yield all([
    watchCheckAuthRequest()
  ]);
}
