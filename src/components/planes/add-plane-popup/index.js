import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import MaterialDialog from '../../material-components/dialog-window';
import TextField from '../../material-components/text-field';
import PlaneLayout from './plane-layout';
import validate from './validate';
import styles from './material.style';
import './index.scss';

export class AddPlanePopup extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    signs: ['A', 'B', 'C', 'D', 'E', 'F'],
    rows: 8,
    location: ['A', 'B', 'C', '', 'D', 'E', 'F']
  };

  onSubmit = (values) => {
    console.log(values);
  };

  getValues = values => () => {
    values.seats.sort();
    const array = Array(7).fill('');

    values.seats.forEach((elem, index) => {
      array[elem] = this.state.signs[index];
    });
    this.setState(state => ({ location: array, rows: +values.rows || state.rows }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <MaterialDialog
          title='Add plane'
          buttonComponent={(
            <Button variant="outlined" color="primary" className={classes.dialogButton}>
              Add plane
            </Button>
          )}
        >
          <div className="add-plane-form__container">
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

                      <div className="add-plane-form__radio-buttons">
                        {this.state.location.map((elem, index) => (
                          <div key={index} className="my-seat">
                            <Field
                              name="seats"
                              component="input"
                              type="checkbox"
                              className="radio-button"
                              value={index}
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        className="row-btn"
                        type="button"
                        onClick={this.getValues(values)}
                      >
                        set value
                      </button>

                    </div>
                    <button className="button add-button" type="submit">
                      Add
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

export default withStyles(styles)(AddPlanePopup);
