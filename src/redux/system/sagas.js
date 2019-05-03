import axios from 'axios';
import { put, call, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import { isLoadingPage, isLoggedInUser } from './actions';
import urls from '../../urls';
import actionTypes from './actionTypes';

function* checkAuth() {
  try {
    yield put(isLoadingPage(true));
    const token = localStorage.getItem('token');
    yield call(() => axios.post(urls.checkAuthentication, null, {
      headers: {
        Authorization: token,
      }
    }));
    yield put(isLoggedInUser(true));
    yield put(isLoadingPage(false));
  } catch (err) {
    yield put(isLoggedInUser(false));
    yield put(isLoadingPage(false));
  }
}

function* loginUser(action) {
  try {
    console.log(action.payload);
    yield delay(1000);
  } catch (err) {
    console.log(err);
  }
}

export default function* watchCheckAuthRequest() {
  yield takeEvery(actionTypes.CHECK_AUTH, checkAuth);
  yield takeLatest(actionTypes.LOGIN_USER, loginUser);
}
