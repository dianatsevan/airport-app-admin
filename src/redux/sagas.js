import { all } from 'redux-saga/effects';
import axios from 'axios';
// import actionTypes from './airports/actionTypes';

export function* sayHello() {
  console.log('sagas hello');
}

// export function* fetchAirportaData() {
//   try {
//     const data = yield axios.get('http://localhost:3001/airports');
//     yield console.log(data);
//     yield put({ type: ''});
//   } catch (err) {
//     console.log(err);
//   }
// }

// export function* rootSaga() {
//   yield all([
//     sayHello(),
//     fetchAirportaData()
//   ]);
// }
