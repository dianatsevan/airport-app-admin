import actionTypes from './actionTypes';
import axios from 'axios';

function addAirport(airportInfo) {
  return {
    type: actionTypes.AIRPORTS_ADDING_SUCCESS,
    airportInfo,
  }
}

export default function sendAirportData(airportInfo) {
  return (dispatch) => {
    return axios.post('http://localhost:3001/airports', airportInfo)
      .then(response => {
        // if (response.statusCode !== 200) {
        //   console.log('error');
        //   throw Error(response.statusText);
        // }
        // dispatch(addAirport(airportInfo));
        // return response.json();
        return response;
      })
      .then(response => dispatch(addAirport(response.data)))
      .catch(err => console.log('err'));
  }
}