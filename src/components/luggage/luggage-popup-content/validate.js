const validate = (values) => {
  const errors = {};
  if (!values.kg) {
    errors.kg = 'Required';
  }

  if (!values.price) {
    errors.price = 'Required';
  }

  return errors;
};

export default validate;
