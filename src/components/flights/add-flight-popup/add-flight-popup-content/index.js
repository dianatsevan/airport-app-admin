import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MenuItem from '@material-ui/core/MenuItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getAirportsData } from '../../../../redux/airports/actions';
import { getPlanesData } from '../../../../redux/planes/actions';
import DatePicker from '../../../material-components/date-picker';
import TimePicker from '../../../material-components/time-picker';
import TextField from '../../../material-components/text-field';
import Select from '../../../material-components/select';
import PlanesSelect from '../../../material-components/planes-select';
import validate from './validate';
import styles from './material.style';
import './index.scss';

class AddFlightPopupContent extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    getAirportsData: PropTypes.func.isRequired,
    getPlanesData: PropTypes.func.isRequired,
    airportsList: PropTypes.array.isRequired,
    planesList: PropTypes.array.isRequired,
    action: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    actionName: PropTypes.string,
    flightId: PropTypes.string,
  };

  state = {
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sut', 'Sun']
  };

  onSubmit = values => {
    const { code, fromCountry, toCountry, price, planeInfo, selectedDays, startDate, endDate } = values;
    const flightToAdd = {
      code,
      fromCountry,
      toCountry,
      price,
      planeInfo,
      flightPeriod: {
        startDate,
        endDate
      }
    };

    if (this.props.actionName === 'edit') {
      flightToAdd.id = this.props.flightId;
    }

    selectedDays.sort();
    const schedule = selectedDays.map((elem) => ({
      day: elem + 1,
      departureTime: values[`${elem}-departureTime`],
      arrivalTime: values[`${elem}-arrivalTime`]
    }));
    flightToAdd.schedule = schedule;

    this.props.action(flightToAdd);
  }

  componentDidMount = () => {
    this.props.getAirportsData();
    this.props.getPlanesData();
  }

  transformAirportsArray = () => this.props.airportsList.map(({ _id, name, code }) => ({
    label: `${name} ${code}`,
    id: _id
  }));

  drawMenuItems = () => this.props.planesList.map(({ _id, code, rowsNumber }) => (
    <MenuItem
      className={this.props.classes.menuItem}
      key={_id}
      value={_id}
      divider
    >
      <div className="planes-list-item__header">
        <div>
          Code: <b>{code}</b>
        </div>
        <div>
          Rows number: <b>{rowsNumber}</b>
        </div>
      </div>
    </MenuItem>
  ));

  makeFieldActive = (selectedDays = [], fieldIndex) => selectedDays.some(day => day === fieldIndex);

  render() {
    const { classes } = this.props;

    return (
      <div className="add-flight-form-container">
        <Form
          onSubmit={this.onSubmit}
          validate={validate}
          initialValues={this.props.initialValues}
          render={({ handleSubmit, values }) => (
            <form className="add-flight-form" onSubmit={handleSubmit}>
              <Field
                name="code"
                label="Flight code"
                component={TextField}
                className={classes.formField}
                type="text"
                variant="outlined"
              />

              <Field
                name="fromCountry"
                label="From country"
                className={classes.formField}
                component={Select}
                multiple={false}
                items={this.transformAirportsArray()}
              />

              <Field
                name="toCountry"
                label="To country"
                className={classes.formField}
                component={Select}
                items={this.transformAirportsArray(values.fromCountry)}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="add-flight-form__date-pickers">
                  <Field
                    name="startDate"
                    label="Start date"
                    className={classNames(classes.datePicker, classes.formField)}
                    component={DatePicker}
                    variant="outlined"
                  />
                  <Field
                    name="endDate"
                    label="End date"
                    className={classNames(classes.datePicker, classes.formField)}
                    component={DatePicker}
                    variant="outlined"
                  />
                </div>
              </MuiPickersUtilsProvider>

              <ExpansionPanel
                className={classes.expPanel}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  className={classes.expPanelSummary}
                >
                  <span>Schedule</span>
                </ExpansionPanelSummary>
                <div>
                  {this.state.daysOfWeek.map((elem, index) => (
                    <div
                      key={elem}
                      className="schedule__item"
                    >
                      <span className="schedule__day-name">{elem}</span>
                      <Field
                        key={elem + index}
                        name="selectedDays"
                        component="input"
                        type="checkbox"
                        className="schedule__day-checkbox"
                        value={index}
                      />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div className="schedule__time-pickers">
                          <Field
                            disabled={!this.makeFieldActive(values.selectedDays, index)}
                            name={`${index}-departureTime`}
                            label="Departure time"
                            className={classNames(classes.timePicker, classes.formField)}
                            component={TimePicker}
                          />

                          <Field
                            disabled={!this.makeFieldActive(values.selectedDays, index)}
                            name={`${index}-arrivalTime`}
                            label="Arrival time"
                            className={classNames(classes.timePicker, classes.formField)}
                            component={TimePicker}
                          />
                        </div>
                      </MuiPickersUtilsProvider>
                    </div>
                  ))}
                </div>
              </ExpansionPanel>

              <Field
                name="price"
                label="Price $"
                component={TextField}
                className={classes.formField}
                type="text"
                variant="outlined"
              />

              <Field
                name="planeInfo"
                label="Plane"
                className={classes.formField}
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
  planesList: state.planesData.planesList,
  selectedFLight: state.flightsData.selectedFLight
});

const mapDispatchToProps = dispatch => ({
  getAirportsData: () => dispatch(getAirportsData()),
  getPlanesData: () => dispatch(getPlanesData())
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AddFlightPopupContent);
