import React, { Component } from 'react';
import AddPlanePopup from './add-plane-popup';

export default class PlanesPage extends Component {
  state = {
    where: 'here'
  };

  render() {
    return (
      <section className="planes-page">
        plane info will be {this.state.where}
        <AddPlanePopup />
      </section>
    );
  }
}
