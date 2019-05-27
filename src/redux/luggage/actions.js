import { createActions } from 'redux-actions';
import actionTypes from './actionTypes';

export const { getLuggageList, getLuggageListError, setLuggageList } = createActions({
  [actionTypes.GET_LUGGAGE_LIST]: null,
  [actionTypes.SET_LUGGAGE_LIST]: null,
  [actionTypes.GET_LUGGAGE_LIST_ERROR]: null,
});
