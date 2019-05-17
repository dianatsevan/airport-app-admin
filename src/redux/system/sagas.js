import axios from 'axios';
import { put, call, takeEvery, delay } from 'redux-saga/effects';
import { isLoadingPage, isLoggedInUser, isCheckingLoginData, isCheckingLoginDataError } from './actions';
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

function* loginUser({ payload: userData }) {
  try {
    yield put(isCheckingLoginData(true));
    yield delay(1000);
    const requestResponse = yield call(() => axios.post(urls.sendLoginFormData, userData));
    localStorage.setItem('id', requestResponse.data.id);
    localStorage.setItem('token', requestResponse.data.token);
    yield put(isCheckingLoginData(false));
    yield put(isLoggedInUser(true));
    yield put(isCheckingLoginDataError(false));
  } catch (err) {
    yield put(isCheckingLoginData(false));
    yield put(isLoggedInUser(false));
    yield put(isCheckingLoginDataError(true));
  }
}

export default function* watchCheckAuthRequest() {
  yield takeEvery(actionTypes.CHECK_AUTH, checkAuth);
  yield takeEvery(actionTypes.LOGIN_USER, loginUser);
}
