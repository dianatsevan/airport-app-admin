import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import MaterialDialog from '../../material-components/dialog-window';
import TextField from '../../material-components/text-field';
import validate from './validate';
import styles from './material.style';
import './index.scss';
import PlaneSeats from './plane-seats';
import SeatsSigns from './seats-signs';

export class AddPlanePopup extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    signs: ['A', 'B', 'C', 'D', 'E', 'F'],
    text: 'Add plane',
    rows: 8,
    location: [1, 2, 3, 4, 5, 6, 7]
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
    this.setState({ location: array });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <MaterialDialog
          title={this.state.text}
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
              render={({ handleSubmit, values }) => {
                // console.log(values);
                return (
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
                      <div className="rows-field-wrapper">
                        <Field
                          name="rows"
                          component={TextField}
                          className={classes.textField}
                          type="text"
                          label="Rows count"
                          margin="dense"
                          variant="outlined"
                        />
                      </div>

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
                )}}
              />
            <div className="add-plane-form__plane-layout">
              <div className="plane__exit plane__exit_front" />
              <SeatsSigns signs={this.state.location} />
              <PlaneSeats
                rows={this.state.rows}
                location={this.state.location}
              />
              <div className="plane__exit plane__exit_back" />
            </div>
          </div>
        </MaterialDialog>
      </div>
    );
  }
}

export default withStyles(styles)(AddPlanePopup);
