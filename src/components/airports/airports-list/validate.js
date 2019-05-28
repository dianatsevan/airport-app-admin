const validate = (values) => {
  const errors = {};
  if (!values.code) {
    errors.code = 'Required';
  } else if (values.code.length !== 3) {
    errors.code = 'the length should be equal 3';
  }

  if (!values.airportName) {
    errors.airportName = 'Required';
  } else if (values.airportName.length > 45) {
    errors.airportName = 'too long airport name';
  }

  return errors;
};

export default validate;
