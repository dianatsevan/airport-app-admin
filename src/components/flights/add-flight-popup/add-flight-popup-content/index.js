import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MenuItem from '@material-ui/core/MenuItem';
import { getAirportsData } from '../../../../redux/airports/actions';
import { getPlanesData } from '../../../../redux/planes/actions';
import DatePicker from '../../../material-components/date-picker';
import TimePicker from '../../../material-components/time-picker';
import TextField from '../../../material-components/text-field';
import Select from '../../../material-components/select';
import PlanesSelect from '../../../material-components/planes-select';
import PlaneLayout from './plane-layout';
import validate from './validate';
import '../../index.scss';

class AddFlightPopupContent extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    getAirportsData: PropTypes.func.isRequired,
    airportsList: PropTypes.array.isRequired,
    planesList: PropTypes.array.isRequired,
  };

  onSubmit = values => console.log(values);

  componentDidMount = () => this.props.getAirportsData();

  transformAirportsArray = () => this.props.airportsList.map(({ _id, name, code }) => ({
    label: `${name} ${code}`,
    id: _id
  }));

  drawMenuItems = () => this.props.planesList.map(({ _id, code, rowsNumber, seatsInRow }) => (
    <MenuItem
      style={{
        height: 'auto'
      }}
      key={_id}
      value={_id}
      divider
    >
      <div className="planes-list-item__header">
        <div>
          code: <b>{code}</b>
        </div>
        <div>
          Rows number: <b>{rowsNumber}</b>
        </div>
        <div>
          Plane layout:
        </div>

        <PlaneLayout
          rows={1}
          location={seatsInRow}
        />
      </div>
    </MenuItem>
  ));

  render() {
    const { classes } = this.props;

    return (
      <div className="add-flight-form-container">
        <Form
          onSubmit={this.onSubmit}
          validate={validate}
          render={({ handleSubmit, values }) => (
            <form className="add-flight-form" onSubmit={handleSubmit}>
              <Field
                name="fromCountry"
                label="From country"
                className={classes.selectField}
                component={Select}
                multiple={false}
                items={this.transformAirportsArray()}
              />

              <Field
                name="toCountry"
                label="To country"
                className={classes.selectField}
                component={Select}
                items={this.transformAirportsArray(values.fromCountry)}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="pickers-wrapper">
                  <Field
                    name="departureDate"
                    label="Departure date"
                    className={classes.dateTimePicker}
                    component={DatePicker}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.rightNotchedOutline
                      }
                    }}
                    variant="outlined"
                  />
                  <Field
                    name="arrivalDate"
                    label="Arrival date"
                    className={classes.dateTimePicker}
                    component={DatePicker}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.leftNotchedOutline
                      }
                    }}
                    variant="outlined"
                  />
                </div>

                <div className="pickers-wrapper">
                  <Field
                    name="departureTime"
                    label="Departure time"
                    className={classes.dateTimePicker}
                    component={TimePicker}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.rightNotchedOutline
                      }
                    }}
                    variant="outlined"
                  />

                  <Field
                    name="arrivalTime"
                    label="Arrival time"
                    className={classes.dateTimePicker}
                    component={TimePicker}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.leftNotchedOutline
                      }
                    }}
                    variant="outlined"
                  />
                </div>
              </MuiPickersUtilsProvider>

              <Field
                name="price"
                label="Price $"
                component={TextField}
                className={classes.textField}
                type="text"
                variant="outlined"
              />

              <Field
                name="planeInfo"
                label="Plane"
                className={classes.selectField}
                component={PlanesSelect}
                kids={this.drawMenuItems()}
              />

              <button className="button" type="submit">
                Add
              </button>
            </form>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  airportsList: state.airportsData.airportsList,
  planesList: state.planesData.planesList
});

const mapDispatchToProps = dispatch => ({
  getAirportsData: () => dispatch(getAirportsData()),
  getPlanesData: () => dispatch(getPlanesData())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFlightPopupContent);
