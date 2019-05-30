import { minLuggageKg, maxLuggageKg, minLuggagePrice, maxLuggagePrice } from '../../../constants';

const validate = (values) => {
  const errors = {};
  if (!values.kg) {
    errors.kg = 'Required';
  } else if (values.kg < minLuggageKg || values.kg > maxLuggageKg) {
    errors.kg = `${minLuggageKg} - ${maxLuggageKg} kg`;
  }

  if (!values.price) {
    errors.price = 'Required';
  } else if (values.price < minLuggagePrice || values.price > maxLuggagePrice) {
    errors.price = `$ ${minLuggagePrice} - ${maxLuggagePrice}`;
  }

  return errors;
};

export default validate;
