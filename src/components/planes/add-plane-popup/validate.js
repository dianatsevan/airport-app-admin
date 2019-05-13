const validate = (values) => {
  const errors = {};
  if (!values.code) {
    errors.code = 'Required';
  }

  if (!values.rows) {
    errors.rows = 'Required';
  }

  if (!values.seats) {
    errors.seats = 'Required';
  }

  return errors;
};

export default validate;
