import axios from 'axios';
import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { setLuggageList, getLuggageListError, editLuggageDataError } from './actions';
import { enqueueSnackbar } from '../notifier/actions';
import urls from '../../urls';
import actionTypes from './actionTypes';

function* getLuggageListData() {
  try {
    const luggageListData = yield call(() => axios.get(urls.luggageList));
    yield put(setLuggageList(luggageListData.data));
    yield put(getLuggageListError(false));
  } catch (err) {
    yield put(getLuggageListError(true));
  }
}

function* editLuggageData({ payload }) {
  try {
    yield call(() => axios.put(`${urls.luggageList}/${payload.id}`, { ...payload }));
    yield put(enqueueSnackbar({ message: 'Saved', variant: 'success' }));
    yield put(editLuggageDataError(false));
    yield getLuggageListData();
  } catch (err) {
    yield put(editLuggageDataError(true));
    yield put(enqueueSnackbar({ message: err.response.data, variant: 'error' }));
  }
}

export default function* watchLuggageData() {
  yield takeEvery(actionTypes.GET_LUGGAGE_LIST, getLuggageListData);
  yield takeLatest(actionTypes.EDIT_LUGGAGE_DATA, editLuggageData);
}
