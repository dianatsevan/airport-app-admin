import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import MaterialDialog from '../../material-components/dialog-window';
import TextField from '../../material-components/text-field';
import PlaneLayout from './plane-layout';
import validate from './validate';
import { addPlaneToDb } from '../../../redux/planes/actions';
import styles from './material.style';
import './index.scss';

export class AddPlanePopup extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    addPlaneToDb: PropTypes.func.isRequired
  };

  state = {
    signs: ['A', 'B', 'C', 'D', 'E', 'F'],
    rows: 8,
    location: ['A', 'B', 'C', '', 'D', 'E', 'F']
  };

  onSubmit = values => {
    if (values.seats) {
      const array = Array(7).fill('');
      values.seats.sort();
      values.seats.forEach((elem, index) => {
        array[elem] = this.state.signs[index];
      });
      this.props.addPlaneToDb({
        code: values.code,
        rowsNumber: values.rows,
        seatsInRow: array
      });
    } else {
      this.props.addPlaneToDb({
        code: values.code,
        rowsNumber: values.rows,
        seatsInRow: this.state.location
      });
    }
  };

  getValues = values => () => {
    if (values.seats) {
      const array = Array(7).fill('');
      values.seats.sort();
      values.seats.forEach((elem, index) => {
        array[elem] = this.state.signs[index];
      });
      this.setState(state => ({ location: array, rows: +values.rows || state.rows }));
    }
    this.setState(state => ({ location: state.location, rows: +values.rows || state.rows }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <MaterialDialog
          title="Add plane"
          buttonComponent={(
            <Button variant="outlined" color="primary" className={classes.dialogButton}>
              Add plane
            </Button>
          )}
        >
          <div className="add-plane-form-container">
            <Form
              onSubmit={this.onSubmit}
              validate={validate}
              render={({ handleSubmit, values }) => (
                <form className="add-plane-form" onSubmit={handleSubmit}>
                  <div className="add-plane-form__fields-wrapper">
                    <Field
                      name="code"
                      component={TextField}
                      className={classes.textField}
                      type="text"
                      label="Code"
                      margin="dense"
                      variant="outlined"
                    />
                    <Field
                      name="rows"
                      component={TextField}
                      className={classes.textField}
                      type="text"
                      label="Rows count"
                      margin="dense"
                      variant="outlined"
                    />

                    <span className="add-plane-form__checkboxes-header">
                      Construct plane layout
                    </span>

                    <div className="add-plane-form__checkboxes">
                      {this.state.location.map((elem, index) => (
                        <Field
                          key={elem + index}
                          name="seats"
                          component="input"
                          type="checkbox"
                          className="checkbox"
                          value={index}
                        />
                      ))}
                    </div>
                    <button
                      className="add-plane-form__set-button"
                      type="button"
                      onClick={this.getValues(values)}
                    >
                      set values
                    </button>

                  </div>
                  <button className="button add-button" type="submit">
                    Add plane
                  </button>

                </form>
              )}
            />
            <PlaneLayout rows={this.state.rows} location={this.state.location} />
          </div>
        </MaterialDialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addPlaneToDb: planeData => dispatch(addPlaneToDb(planeData))
});

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(AddPlanePopup);
