import { createActions } from 'redux-actions';
import actionTypes from "./actionTypes";

export const { getAirportsData, setAirportsData, getAirportsDataError } = createActions({
  [actionTypes.GET_AIRPORTS_DATA]: null,
  [actionTypes.SET_AIRPORTS_DATA]: airportsList => airportsList,
  [actionTypes.GET_AIRPORTS_DATA_ERROR]: bool => bool,
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