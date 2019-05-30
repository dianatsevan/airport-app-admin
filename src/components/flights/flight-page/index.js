import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { FaPencilAlt } from 'react-icons/fa';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import MaterialDialog from '../../material-components/dialog-window';
import ScheduleTable from './schedule-table/index';
import OrdersTable from './orders-table/index';
import ExpPanel from '../../material-components/expansion-panel';
import PlaneLayout from '../../planes/add-plane-popup/plane-layout';
import AddFlightPopupContent from '../add-flight-popup/add-flight-popup-content';
import { getSelectedFlightData, editFlight } from '../../../redux/flights/actions';
import styles from './material.style.js';
import './index.scss';

function FlightPage({ selectedFlight, classes, editFlight, getSelectedFlightData, history }) {
  FlightPage.propTypes = {
    selectedFlight: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    editFlight: PropTypes.func.isRequired,
    getSelectedFlightData: PropTypes.func.isRequired,
  };

  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    getSelectedFlightData(history.location.pathname.slice(13));
  }, []);

  const handleDateChange = () => console.log('ok');

  const handleChange = event => setSelectedDate(event.target.value);

  const unique = (value, index, self) => self.indexOf(value) === index;

  const drawDates = () => {
    const dates = selectedFlight.flightOrders.map(({ departureDate }) => moment(departureDate).format('L'));
    const uniqueDates = dates.filter(unique).sort();

    return uniqueDates.map(date => (
      date && <MenuItem key={date} value={date}>{date}</MenuItem>
    ));
  };

  const soldSeats = () => {
    const seats = [];
    selectedFlight.flightOrders.map(({ departureDate, passengersInfo }) => {
      if (selectedDate === moment(departureDate).format('L')) {
        passengersInfo.map(({ selectedSeat }) => seats.push(selectedSeat));
      }
    });

    return seats;
  };

  const getSeatsAmount = () => {
    const columns = selectedFlight.planeInfo.seatsInRow.filter(elem => elem);
    return selectedFlight.planeInfo.rowsNumber * columns.length;
  };

  const { _id, code, fromCountry, toCountry, price, planeInfo, flightPeriod, schedule } = selectedFlight;

  const makeInitialValuesObject = () => {
    const initialValues = {
      code,
      fromCountry: fromCountry._id,
      toCountry: toCountry._id,
      startDate: moment(flightPeriod.startDate).format(),
      endDate: moment(flightPeriod.endDate).format(),
      price,
      planeInfo: planeInfo._id,
      selectedDays: schedule.map(({ dayOfWeek }) => dayOfWeek - 1),
    };

    schedule.forEach(({ dayOfWeek, departureTime, arrivalTime }) => {
      initialValues[`${dayOfWeek - 1}-departureTime`] = moment(departureTime).format();
      initialValues[`${dayOfWeek - 1}-arrivalTime`] = moment(arrivalTime).format();
    });

    return initialValues;
  };

  return (
    <Paper className={classes.paper}>
      <section className="flight-page">
        <div className="flight-page__content-wrapper">
          <div className="flight-page__content">

            <div className="flight-page__header header">
              <div className="header__field">
                <span className="header__field-label">Code:</span>
                <span className="header__field-value">{code}</span>
              </div>
              <div className="header__field">
                <span className="header__field-label">From:</span>
                <span className="header__field-value">{fromCountry.name}</span>
              </div>
              <div className="header__field">
                <span className="header__field-label">To:</span>
                <span className="header__field-value">{toCountry.name}</span>
              </div>
            </div>

            <ExpPanel title="Flight period">
              <div className="flight-page__dates">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    className={classes.datePicker}
                    margin="normal"
                    label="Flight start date"
                    value={new Date(flightPeriod.startDate)}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    className={classes.datePicker}
                    margin="normal"
                    label="Flight end date"
                    value={new Date(flightPeriod.endDate)}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </ExpPanel>

            <ExpPanel title="Schedule">
              <ScheduleTable schedule={schedule} />
            </ExpPanel>

            <ExpPanel title="Orders">
              <div className="flight-page__orders">
                {selectedFlight.flightOrders.length
                  ? (
                    <>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-simple">Flight date</InputLabel>
                        <Select
                          variant="outlined"
                          value={selectedDate}
                          className={classes.dateSelect}
                          onChange={handleChange}
                        >
                          <MenuItem value="" selected>All</MenuItem>
                          {drawDates()}
                        </Select>
                      </FormControl>
                      <OrdersTable orders={selectedFlight.flightOrders} date={selectedDate} />
                    </>
                  ) : (
                    <span>No orders yet</span>
                  )
                }
              </div>
            </ExpPanel>

            <MaterialDialog
              title="Edit flight"
              buttonComponent={(
                <button
                  type="button"
                  className="button planes-list-item__buttons"
                >
                  Edit
                  <FaPencilAlt className="planes-list-item__button-icon" />
                </button>
              )}
            >
              <AddFlightPopupContent
                flightId={_id}
                initialValues={makeInitialValuesObject()}
                actionName="edit"
                buttonName="Edit flight"
                action={editFlight}
              />
            </MaterialDialog>
          </div>

          <div className="flight-page__plane-layout">
            <PlaneLayout
              rows={selectedFlight.planeInfo.rowsNumber}
              location={selectedFlight.planeInfo.seatsInRow}
              soldSeats={soldSeats()}
            />
            <div className="flight-page__header header">
              <div className="header__field">
                <span className="header__field-label">Code:</span>
                <span className="header__field-value">{selectedFlight.planeInfo.code}</span>
              </div>
              <div className="header__field">
                <span className="header__field-label">Seats:</span>
                <span className="header__field-value">{getSeatsAmount()}</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Paper>
  );
}

const mapStateToProps = state => ({
  selectedFlight: state.flightsData.selectedFlight
});

const mapDispatchToProps = dispatch => ({
  editFlight: newFlightData => dispatch(editFlight(newFlightData)),
  getSelectedFlightData: id => dispatch(getSelectedFlightData(id))
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(FlightPage);
