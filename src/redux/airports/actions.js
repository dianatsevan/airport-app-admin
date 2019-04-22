import { createActions, handleActions } from 'redux-actions';
import actionTypes from "./actionTypes";

// export function getAirportsData() {
//   return {
//     type: actionTypes.GET_AIRPORTS_DATA
//   }
// }

// export function setAirportsData(airports) {
//   return {
//     type: actionTypes.SET_AIRPORTS_DATA,
//     airports
//   }
// }

// export function getAirportsDataError(bool) {
//   return {
//     type: actionTypes.GET_AIRPORTS_DATA_ERROR,
//     bool
//   }
// }

export const { getAirportsData, setAirportsData, getAirportsDataError } = createActions({
  GET_AIRPORTS_DATA: null,
  SET_AIRPORTS_DATA: null,
  GET_AIRPORTS_DATA_ERROR: null,
});

// function addAirport(airportInfo) {
//   return {
//     type: actionTypes.AIRPORTS_ADDING_SUCCESS,
//     airportInfo,
//   }
// }

// export default function sendAirportData(airportInfo) {
//   return (dispatch) => {
//     return axios.post('http://localhost:3001/airports', airportInfo)
//       .then(response => {
//         // if (response.statusCode !== 200) {
//         //   console.log('error');
//         //   throw Error(response.statusText);
//         // }
//         // dispatch(addAirport(airportInfo));
//         // return response.json();
//         return response;
//       })
//       .then(response => dispatch(addAirport(response.data)))
//       .catch(err => console.log('err'));
//   }
// }