import React, { Component } from 'react';
import AddFlightPopup from './add-flight-popup';
import FlightsList from './flights-list/material.table';

class FlightsPage extends Component {
  render() {
    return (
      <section className="flights-page">
        <AddFlightPopup />
        <FlightsList />
      </section>
    )
  }
}

export default FlightsPage;
