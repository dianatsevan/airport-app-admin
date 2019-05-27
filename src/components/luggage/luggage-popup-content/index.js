import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import TextField from '../../material-components/text-field';
import validate from './validate';
import styles from './material.style';
import './index.scss';

function LuggagePopupContent({ id, kg, price, classes, buttonName, action }) {
  LuggagePopupContent.propTypes = {
    classes: PropTypes.object.isRequired,
    buttonName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    kg: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    action: PropTypes.func.isRequired,
  };

  const onSubmit = values => action({ id, ...values });

  return (
    <div className="luggage-form-container">
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{
          kg,
          price,
        }}
        render={({ handleSubmit }) => (
          <form className="luggage-form" onSubmit={handleSubmit}>
            <Field
              name="kg"
              component={TextField}
              className={classes.textField}
              type="text"
              label="Kg"
              margin="dense"
              variant="outlined"
            />
            <Field
              name="price"
              component={TextField}
              className={classes.textField}
              type="text"
              label="Price"
              margin="dense"
              variant="outlined"
            />

            <button className="button luggage-form__button" type="submit">
              {buttonName}
            </button>

          </form>
        )}
      />
    </div>
  );
}

export default withStyles(styles)(LuggagePopupContent);
