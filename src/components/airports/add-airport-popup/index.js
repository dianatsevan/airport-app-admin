import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import MaterialDialog from '../../material-components/dialog-window';
import Select from '../../material-components/select';
import styles from './material.style';
import { getAirportsToAdd, addAirportsToDb } from '../../../redux/airports/actions';
import '../../../styles/button.scss';
import './index.scss';

class AddAirportPopup extends React.Component {
  static propTypes = {
    airports: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    addAirportsToDB: PropTypes.func.isRequired,
    getAirportsToAdd: PropTypes.func.isRequired
  };

  componentDidMount = () => this.props.getAirportsToAdd();

  onSubmit = values => {
    // const selectedAirports = this.props.airports.filter(airport => values.code.some(code => code === airport.alpha3Code));
    const selectedAirports = this.props.airports.filter(airport => values.code === airport.alpha3Code);
    const transformedAirports = selectedAirports.map(({ name, alpha3Code }) => ({ name, code: alpha3Code }));
    this.props.addAirportsToDB(transformedAirports);
  };

  transformArray = airportsToAdd => airportsToAdd.map(({ name, alpha3Code }) => ({ label: name, id: alpha3Code }));

  render() {
    const { classes } = this.props;
    const airports = this.transformArray(this.props.airports);

    return (
      <div className="wrapper">
        <MaterialDialog
          title="Add airport"
          buttonComponent={(
            <Button variant="outlined" color="primary" className={classes.dialogButton}>
              Add airport
            </Button>
          )}
        >
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
  addAirportsToDB: data => dispatch(addAirportsToDb(data)),
  getAirportsToAdd: () => dispatch(getAirportsToAdd())
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AddAirportPopup);
