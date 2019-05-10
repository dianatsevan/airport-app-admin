const validate = (values) => {
  const errors = {};
  if (!values.code) {
    errors.code = 'Required';
  } else if (values.code.length !== 3) {
    errors.code = 'the length should be equal 3';
  }

  if (values.airport.length > 45) {
    errors.airport = 'too long airport name';
  } 

  if (!values.airport) {
    errors.airport = 'Required';
  }
  return errors;
};

export default validate;
