import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import TextField from '../../material-components/text-field';
import validate from './validate';

export default function DialogForm({
  code, airport, classes, onSubmit
}) {
  DialogForm.propTypes = {
    code: PropTypes.string.isRequired,
    airport: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{
        code,
        airport
      }}
      render={({ handleSubmit }) => (
        <form className="add-airport-form" onSubmit={handleSubmit}>
          <Field
            variant="outlined"
            name="code"
            label="Code"
            value={code}
            className={classes.texField}
            component={TextField}
          />
          <Field
            variant="outlined"
            name="airport"
            label="Airport"
            className={classes.texField}
            component={TextField}
          />

          <button className="button" type="submit">
            Save changes
          </button>
        </form>
      )}
    />
  );
}
