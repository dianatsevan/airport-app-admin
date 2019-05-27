export const urls = {
  getAirportsUrl: 'http://localhost:3001/airports',
  getAirportsToAdd: 'https://restcountries.eu/rest/v2/all?fields=name;alpha3Code',
  checkAuthentication: 'http://localhost:3001/user/check-auth',
  sendLoginFormData: 'http://localhost:3001/user/login',
  addAirportToDb: 'http://localhost:3001/airports',
  addPlaneToDb: 'http://localhost:3001/plane-layout',
  getPlanesList: 'http://localhost:3001/plane-layout',
  flightsUrl: 'http://localhost:3001/tickets',
  flightOrdersUrl: 'http://localhost:3001/order?selectedFlight=',
  flightsOrders: 'http://localhost:3001/order',
  luggageList: 'http://localhost:3001/luggage-types'
};

export default urls;
