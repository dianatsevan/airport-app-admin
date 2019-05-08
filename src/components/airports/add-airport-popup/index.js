import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Field } from 'react-final-form';
import MaterialDialog from '../../material-components/dialog';
import Select from '../../material-components/select';
import styles from './material.style';
import { addAirportsToDb } from '../../../redux/airports/actions';
import '../../../styles/button.scss';
import './index.scss';

class AddAirportPopup extends React.Component {
  static propTypes = {
    airports: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    addAirportsToDB: PropTypes.func.isRequired,
  };

  onSubmit = values => {
    const selectedAirports = this.props.airports.filter(airport => airport.alpha3Code === values.code);
    const transformedAirportsArray = selectedAirports.map(({ name, alpha3Code }) => ({ name, code: alpha3Code }));
    this.props.addAirportsToDB(transformedAirportsArray);
  };

  transformArray = airportsToAdd => {
    const airports = airportsToAdd.map(({ name, alpha3Code }) => ({
      label: name,
      id: alpha3Code
    }));

    return airports;
  }

  render() {
    const { classes } = this.props;
    const airports = this.transformArray(this.props.airports);

    return (
      <div className="wrapper">
        <MaterialDialog title="Add airport" buttonClass={classes.dialogButton}>
          <Form
            onSubmit={this.onSubmit}
            render={({ handleSubmit }) => (
              <form className="add-airport-form" onSubmit={handleSubmit}>
                <Field
                  name="code"
                  label="Airport"
                  className={classes.selectField}
                  component={Select}
                  items={airports}
                />

                <button className="button" type="submit">
                  Add
                </button>
              </form>
            )}
          />
        </MaterialDialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  airports: state.airportsData.airportsToAdd
});

const mapDispatchToProps = dispatch => ({
  addAirportsToDB: data => dispatch(addAirportsToDb(data))
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AddAirportPopup);
