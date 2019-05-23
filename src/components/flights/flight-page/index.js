import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import Paper from '@material-ui/core/Paper';

import { getSelectedFlightData } from '../../../redux/flights/actions';
import styles from './material.style.js';
import './index.scss';


function FlightPage({ selectedFlight, get, history, classes }) {
  FlightPage.propTypes = {
    selectedFlight: PropTypes.object.isRequired,
    get: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  };

  const [date, setDate] = useState(new Date('03/03/1999'));

  useEffect(() => {
    const flightId = history.location.pathname.slice(13);
    get(flightId);
  }, []);

  const handleDateChange = () => console.log('ok');

  const { code, fromCountry, toCountry, price, planeInfo, flightPeriod, schedule } = selectedFlight;

  return (
    <Paper className={classes.paper}>
      <section className="flight-page">
        <span className="flight-page__header">Flight {code}</span>

        <div className="flight-page__content-wrapper">
          <div className="flight-page__content">
            <div className="flight-page__destination">
              <div className="flight-page__country">
                <span className="flight-page__header">From</span>
                <span className="flight-page__country-name">{fromCountry.name}</span>
              </div>
              <div className="flight-page__country">
                <span className="flight-page__header">To</span>
                <span className="flight-page__country-name">{toCountry.name}</span>
              </div>
            </div>

            <div className="flight-page__flight-period">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  className={classes.datePicker}
                  margin="normal"
                  label="Start date"
                  value={new Date(flightPeriod.startDate)}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  className={classes.datePicker}
                  margin="normal"
                  label="End date"
                  value={new Date(flightPeriod.endDate)}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>

          <div className="flight-page__plane-layout"></div>
        </div>
      </section>
    </Paper>
  );
}

const mapStateToProps = state => ({
  selectedFlight: state.flightsData.selectedFlight
});

const mapDispatchToProps = dispatch => ({
  get: flightId => dispatch(getSelectedFlightData(flightId))
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(FlightPage);
