import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import TextField from '../../../material-components/text-field';
import PlaneLayout from '../plane-layout';
import styles from '../material.style';

class AddPlanePopupContent extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    action: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    buttonName: PropTypes.string.isRequired,
    id: PropTypes.string,
    rowsNumber: PropTypes.number,
    actionName: PropTypes.string.isRequired
  };

  state = {
    signs: ['A', 'B', 'C', 'D', 'E', 'F'],
    rows: 8,
    location: ['A', 'B', 'C', '', 'D', 'E', 'F']
  };

  transformArray = seatsArray => {
    const array = Array(7).fill('');
    seatsArray.sort();
    seatsArray.forEach((elem, index) => {
      array[elem] = this.state.signs[index];
    });
    return array;
  }

  onSubmit = values => {
    const data = {
      id: this.props.id,
      code: values.code,
      rowsNumber: values.rows,
      seatsInRow: values.seats ? this.transformArray(values.seats) : this.props.seatsInRow
    };
    this.props.action(data);
  };

  getValues = values => () => {
    if (values.seats) {
      const transformedArray = this.transformArray(values.seats);
      this.setState({ location: transformedArray });
    }
    if (values.rows && +values.rows > 4 && +values.rows < 21) {
      this.setState({ rows: +values.rows });
    }
    if (values.rows && +values.rows > 20) {
      this.setState({ rows: 20 });
    }
    if (values.rows && +values.rows < 5) {
      this.setState({ rows: 5 });
    }
  };

  render() {
    const { classes, actionName, buttonName, validate, code } = this.props;
    const seatsInRow = this.props.seatsInRow || this.state.location;
    const planeCode = actionName === 'edit' ? code : '';
    const rowsNumber = this.props.rowsNumber || this.state.rows;

    return (
      <div className="add-plane-form-container">
        <Form
          onSubmit={this.onSubmit}
          validate={validate}
          initialValues={{
            code: planeCode,
            rows: rowsNumber
          }}
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
                {buttonName}
              </button>

            </form>
          )}
        />
        <PlaneLayout rows={this.state.rows} location={seatsInRow} />
      </div>
    );
  }
}

export default withStyles(styles)(AddPlanePopupContent);
