import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import urls from '../../urls';
import actionTypes from './actionTypes';

function* checkAuth() {
  try {
    yield put({ type: actionTypes.IS_LOADING_PAGE, bool: true });
    const token = localStorage.getItem('token');
    yield call(() => axios.post(urls.checkAuthentication, null, {
      headers: {
        Authorization: token,
      }
    }));
    yield put({ type: actionTypes.IS_LOGGED_IN_USER, bool: true });
    yield put({ type: actionTypes.IS_LOADING_PAGE, bool: false });
  } catch (err) {
    yield put({ type: actionTypes.IS_LOGGED_IN_USER, bool: false });
    yield put({ type: actionTypes.IS_LOADING_PAGE, bool: false });
  }
}

export default function* watchCheckAuthRequest() {
  yield takeEvery(actionTypes.AUTHORIZE_USER, checkAuth);
}
