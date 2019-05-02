import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Field } from 'react-final-form';
import MaterialDialog from '../../material-components/dialog';
import Select from '../../material-components/select';
import validate from './validate';
import styles from './material.style';
import '../../../styles/button.scss';
import './index.scss';

class AddAirportPopup extends React.Component {
  static propTypes = {
    airports: PropTypes.array.isRequired
  };

  onSubmit = values => {
    return localStorage.setItem('ex', JSON.stringify(values));
  };

  transformArray = airportsToAdd => {
    const airports = airportsToAdd.map(({ name, alpha3Code }) => {
      return {
        label: name,
        id: alpha3Code
      }
    });
    
    return airports;
  }

  render () {
    const { classes } = this.props;
    const airports = this.transformArray(this.props.airports);

    return (
      <div className="wrapper">
        <MaterialDialog title='Add airport'>
          <Form
            onSubmit={this.onSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
              <form className="add-airport-form" onSubmit={handleSubmit}>
                <Field
                  name="airport"
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
    )
  }
}

const mapStateToProps = state => ({
  airports: state.airportsData.airportsToAdd
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(AddAirportPopup);
