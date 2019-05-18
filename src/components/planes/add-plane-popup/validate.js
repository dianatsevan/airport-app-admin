import { minSeatsRowsCount, maxSeatsRowsCount,minSeatsColumnsCount, maxSeatsColumnsCount } from '../../../constants';

const validate = (values) => {
  const errors = {};
  if (!values.code) {
    errors.code = 'Required';
  }

  if (!values.rowsNumber) {
    errors.rowsNumber = 'Required';
  } else if (+values.rowsNumber > maxSeatsRowsCount) {
    errors.rowsNumber = `Max - ${maxSeatsRowsCount}`;
  } else if (+values.rowsNumber < minSeatsRowsCount) {
    errors.rowsNumber = `Min - ${minSeatsRowsCount}`;
  }

  if (!values.columnsNumber) {
    errors.columnsNumber = 'Required';
  } else if (+values.columnsNumber > maxSeatsColumnsCount) {
    errors.columnsNumber = `Max - ${maxSeatsColumnsCount}`;
  } else if (+values.columnsNumber < minSeatsColumnsCount) {
    errors.columnsNumber = `Min - ${minSeatsColumnsCount}`;
  }

  if (!values.seats) {
    errors.seats = 'Required';
  }

  return errors;
};

export default validate;
