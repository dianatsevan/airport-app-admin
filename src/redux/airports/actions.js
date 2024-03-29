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
    return axios.post('/somewhere', airportInfo)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      })
      .then(result => dispatch(addAirport(result)))
      .catch(err => console.log(err));
  }
}