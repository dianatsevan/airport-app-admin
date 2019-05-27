import { createActions } from 'redux-actions';
import actionTypes from './actionTypes';

export const { getLuggageList, getLuggageListError, setLuggageList, editLuggageData, editLuggageDataError } = createActions({
  [actionTypes.GET_LUGGAGE_LIST]: null,
  [actionTypes.SET_LUGGAGE_LIST]: null,
  [actionTypes.GET_LUGGAGE_LIST_ERROR]: null,
  [actionTypes.EDIT_LUGGAGE_DATA]: null,
  [actionTypes.EDIT_LUGGAGE_DATA_ERROR]: null
});
