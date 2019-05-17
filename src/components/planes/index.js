import React, { Component } from 'react';
import AddPlanePopup from './add-plane-popup';

export default class PlanesPage extends Component {
  render() {
    return (
      <section className="planes-page">
        <AddPlanePopup />
      </section>
    );
  }
}
