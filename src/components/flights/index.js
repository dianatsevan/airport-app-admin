import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFlightsData } from '../../redux/flights/actions';
import AddFlightPopup from './add-flight-popup';
import FlightsList from './flights-list';

function FlightsPage({ getFlightsData }) {
  FlightsPage.propTypes = {
    getFlightsData: PropTypes.func.isRequired,
  };

  useEffect(() => {
    getFlightsData();
  }, []);

  return (
    <section className="flights-page">
      <AddFlightPopup />
      <FlightsList />
    </section>
  );
}

const mapDispatchToProps = dispatch => ({
  getFlightsData: () => dispatch(getFlightsData())
});

export default connect(null, mapDispatchToProps)(FlightsPage);
