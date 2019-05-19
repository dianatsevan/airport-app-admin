import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import TextField from '../../../material-components/text-field';
import PlaneLayout from '../plane-layout';
import { minSeatsRowsCount, maxSeatsRowsCount, maxSeatsColumnsCount, minSeatsColumnsCount } from '../../../../constants';
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
    signs: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    code: this.props.code,
    columnsNumber: this.props.columnsNumber,
    rowsNumber: this.props.rowsNumber,
    seatsInRow: this.props.seatsInRow
  };

  convertToRowTemplate = (selectedSeats, columns) => {
    const rowTemplate = Array(this.state.columnsNumber).fill('');
    selectedSeats.sort().forEach((elem, index) => {
      rowTemplate[elem] = this.state.signs[index];
    });

    return rowTemplate.length > columns ? rowTemplate.slice(0, columns) : rowTemplate;
  }

  onSubmit = ({ code, rowsNumber, columnsNumber, seats }) => {
    const { id, seatsInRow, action } = this.props;

    const data = {
      id,
      code,
      rowsNumber,
      columnsNumber,
      seatsInRow: seats ? this.convertToRowTemplate(seats, columnsNumber) : seatsInRow
    };

    action(data);
  };

  getValues = ({ code, rowsNumber, columnsNumber, seats}) => async () => {
    const [rows, columns] = [+rowsNumber, +columnsNumber];

    if (code) {
      await this.setState({ code });
    }
    if (columns) {
      await this.setState({ columnsNumber: columns });
    }

    if (seats) {
      await this.setState({ seatsInRow: this.convertToRowTemplate(seats, columnsNumber) });
    }
    if (rows) {
      this.setState({ rowsNumber: rows });
    }
    if (rows && rows > maxSeatsRowsCount) {
      this.setState({ rowsNumber: maxSeatsRowsCount });
    }
    if (rows && rows < minSeatsRowsCount) {
      this.setState({ rowsNumber: minSeatsRowsCount });
    }
  };

  drawSeatsRow = columnsNumber => {
    let columns;
    if (!columnsNumber) {
      columns = this.state.columnsNumber;
    }
    if (columnsNumber) {
      columns = columnsNumber;
    }
    if (columnsNumber && columnsNumber > maxSeatsColumnsCount) {
      columns = maxSeatsColumnsCount;
    }
    if (columnsNumber && columnsNumber < minSeatsColumnsCount) {
      columns = minSeatsColumnsCount;
    }

    return Array(columns).fill('').map((elem, index) => (
      <Field
        key={elem + index}
        name="seats"
        component="input"
        type="checkbox"
        className="checkbox"
        value={index}
      />
    ))
  };

  render() {
    const { classes, buttonName, validate } = this.props;
    const { code, rowsNumber, seatsInRow, columnsNumber } = this.state;
    const selectedSeats = seatsInRow.map((elem, index) => {
      if (elem) return index;
    });

    return (
      <div className="add-plane-form-container">
        <Form
          onSubmit={this.onSubmit}
          validate={validate}
          initialValues={{
            code,
            columnsNumber,
            rowsNumber,
            seats: selectedSeats
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
                  name="rowsNumber"
                  component={TextField}
                  className={classes.textField}
                  type="text"
                  label="Rows count"
                  margin="dense"
                  variant="outlined"
                />
                <Field
                  name="columnsNumber"
                  component={TextField}
                  className={classes.textField}
                  type="text"
                  label="Columns count"
                  margin="dense"
                  variant="outlined"
                />

                <span className="add-plane-form__checkboxes-header">
                  Construct plane layout
                </span>

                <div className="add-plane-form__checkboxes">
                  {this.drawSeatsRow(+values.columnsNumber)}
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
        <PlaneLayout rows={rowsNumber} location={seatsInRow} />
      </div>
    );
  }
}

export default withStyles(styles)(AddPlanePopupContent);
