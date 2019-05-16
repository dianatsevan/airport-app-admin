import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DatePicker from '../../../material-components/date-picker';
import TimePicker from '../../../material-components/time-picker';
import TextField from '../../../material-components/text-field';
import Select from '../../../material-components/select';
import '../../index.scss';

class AddFlightPopupContent extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  onSubmit = values => console.log(values);

  render() {
    const { classes } = this.props;

    return (
      <div className="add-flight-form-container">
        <Form
          onSubmit={this.onSubmit}
          render={({ handleSubmit }) => (
            <form className="add-flight-form" onSubmit={handleSubmit}>
              <Field
                name="fromCountry"
                label="From country"
                className={classes.selectField}
                component={Select}
                items={[{label: 'Abakan', id: 'ABA'}]}
              />

              <Field
                name="toCountry"
                label="To country"
                className={classes.selectField}
                component={Select}
                items={[{label: 'Mala Mala', id: 'MAL'}]}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Field
                  name="date"
                  label="Departure date"
                  className={classes.textField}
                  component={DatePicker}
                  variant="outlined"
                />

                <Field
                  name="startTime"
                  label="Departure time"
                  className={classes.textField}
                  component={TimePicker}
                  variant="outlined"
                />

                <Field
                  name="endTime"
                  label="Arrival time"
                  className={classes.textField}
                  component={TimePicker}
                  variant="outlined"
                />
              </MuiPickersUtilsProvider>

              <Field
                name="price"
                label="Price"
                component={TextField}
                className={classes.textField}
                type="text"
                variant="outlined"
              />

              <Field
                name="planeInfo"
                label="Plane"
                className={classes.selectField}
                component={Select}
                items={[{label: 'planes', id: 'planes'}]}
              />

              <button className="button" type="submit">
                Add
              </button>
            </form>
          )}
        />
      </div>
    )
  }
}

export default AddFlightPopupContent;
