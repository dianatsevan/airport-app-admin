import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Field } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import sendAirportData from '.././../../redux/airports/actions';
import TextField from '../../material-components/text-field';
import '../../../styles/button.scss';
import '../../../styles/fieldset.scss';
import styles from './material.style';

class AddAirportForm extends React.Component {
  static propTypes = {};

  onSubmit = values => this.props.sendAirportData(values);

  render() {
    const { classes } = this.props;
    return (
      <div className="add-airport">
        <Form
          onSubmit={this.onSubmit}
          render={({ handleSubmit }) => (
            <form className="add-airport-form" onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <legend className="legend">
                  Add airport
                </legend>
                <div className="add-airport-form__fields">
                  <Field
                    name="code"
                    label="Code"
                    className={classes.textField}
                    component={TextField}
                    variant="outlined"
                  />
                  <Field
                    name="name"
                    label="Name"
                    className={classes.textField}
                    component={TextField}
                    variant="outlined"
                  />
                </div>

                <button className="button" type="submit">Add</button>
              </fieldset>
            </form>
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendAirportData: airportInfo => dispatch(sendAirportData(airportInfo)),
});

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps),
)(AddAirportForm);