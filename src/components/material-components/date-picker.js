import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'material-ui-pickers';

export default function DatePickerWrapper(props) {
  DatePickerWrapper.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
  };

  const {
    input: {
      name, onChange, value, ...restInput
    },
    meta,
    ...rest
  } = props;
  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error)
    && meta.touched;

  return (
    <DatePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === '' ? null : value}
    />
  );
}
