import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPlanesData } from '../../redux/planes/actions';
import AddPlanePopup from './add-plane-popup';

class PlanesPage extends Component {
  static propTypes = {
    getPlanesData: PropTypes.func.isRequired
  };

  componentDidMount = () => this.props.getPlanesData();

  render() {
    return (
      <section className="planes-page">
        <AddPlanePopup />
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getPlanesData: () => dispatch(getPlanesData())
});

export default connect(null, mapDispatchToProps)(PlanesPage);
