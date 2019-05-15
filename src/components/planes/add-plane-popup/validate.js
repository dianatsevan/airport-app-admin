const validate = (values) => {
  const errors = {};
  if (!values.code) {
    errors.code = 'Required';
  }

  if (!values.rows) {
    errors.rows = 'Required';
  } else if (+values.rows > 20) {
    errors.rows = 'Max - 20';
  } else if (+values.rows < 5) {
    errors.rows = 'Min - 5';
  }

  if (!values.seats) {
    errors.seats = 'Required';
  }

  return errors;
};

export default validate;
