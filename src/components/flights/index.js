import React from 'react';
import AddFlightPopup from './add-flight-popup';
import FlightsList from './flights-list';

function FlightsPage() {
  return (
    <section className="flights-page">
      <AddFlightPopup />
      <FlightsList />
    </section>
  );
}

export default FlightsPage;
