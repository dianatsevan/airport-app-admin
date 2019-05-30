import moment from 'moment';

const validate = (values) => {
  const errors = {};
  const startDate = moment(values.startDate).format('L');
  const endDate = moment(values.endDate).format('L');
  const today = moment(new Date()).format('L');

  if (!values.code) {
    errors.code = 'Required';
  }

  if (!values.fromCountry) {
    errors.fromCountry = 'Required';
  }

  if (!values.toCountry) {
    errors.toCountry = 'Required';
  } else if (values.toCountry === values.fromCountry) {
    errors.toCountry = 'Please, choose another country';
  }

  if (!values.startDate) {
    errors.startDate = 'Required';
  }

  if (!values.endDate) {
    errors.endDate = 'Required';
  } else if (endDate < startDate) {
    errors.endDate = 'Please, choose another day';
  }

  if (!values.selectedDays) {
    errors.selectedDays = true;
  }

  if (values.selectedDays) {
    values.selectedDays.forEach(day => {
      if (!values[`${day}-departureTime`]) {
        errors[`${day}-departureTime`] = 'Required';
      }
      if (!values[`${day}-arrivalTime`]) {
        errors[`${day}-arrivalTime`] = 'Required';
      }
    });
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
