import React, { Component } from 'react';
import AddFlightPopup from './add-flight-popup';

class FlightsPage extends Component {
  render() {
    return (
      <section className="flights-page">
        <AddFlightPopup />
      </section>
    )
  }
}

export default FlightsPage;
