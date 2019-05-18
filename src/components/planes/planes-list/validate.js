const validate = (values) => {
  const errors = {};

  if (+values.rows > 20) {
    errors.rows = 'Max - 20';
  } else if (+values.rows < 5) {
    errors.rows = 'Min - 5';
  }

  return errors;
};

export default validate;
