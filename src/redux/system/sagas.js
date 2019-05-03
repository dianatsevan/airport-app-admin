import { put, call, takeEvery } from 'redux-saga/effects';
import { urls } from '../../urls';
import actionTypes from './actionTypes';
import axios from 'axios';

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
    console.log(err);
  } 
}

export function* watchCheckAuthRequest() {
  yield takeEvery(actionTypes.AUTHORIZE_USER, checkAuth);
}
