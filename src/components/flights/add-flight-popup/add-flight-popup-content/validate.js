import moment from 'moment';

const validate = (values) => {
  const errors = {};
  const departureDate = moment(values.departureDate).format('L');
  const arrivalDate = moment(values.arrivalDate).format('L');
  const today = moment(new Date()).format('L');

  if (!values.fromCountry) {
    errors.fromCountry = 'Required';
  }

  if (!values.toCountry) {
    errors.toCountry = 'Required';
  } else if (values.toCountry === values.fromCountry) {
    errors.toCountry = 'Please, choose another country';
  }

  if (!values.departureDate) {
    errors.departureDate = 'Required';
  } else if (departureDate < today) {
    errors.departureDate = 'Please, choose another day';
    errors.departureDate = 'Departure day should be not less than today';
  }

  if (!values.arrivalDate) {
    errors.arrivalDate = 'Required';
  } else if (arrivalDate < departureDate) {
    errors.arrivalDate = 'Please, choose another day';
    errors.arrivalDate = 'Arrival day should be more than departure';
  }

  if (!values.departureTime) {
    errors.departureTime = 'Required';
  }

  if (!values.arrivalTime) {
    errors.arrivalTime = 'Required';
  }

  if (!values.price) {
    errors.price = 'Required';
  }

  if (!values.planeInfo) {
    errors.planeInfo = 'Required';
  }

  return errors;
};

export default validate;
