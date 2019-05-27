import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import { setLuggageList, getLuggageListError } from './actions';
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

export default function* watchLuggageData() {
  yield takeEvery(actionTypes.GET_LUGGAGE_LIST, getLuggageListData);
}
