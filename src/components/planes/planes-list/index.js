import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import PlaneLayout from '../add-plane-popup/plane-layout';
import './index.scss';

class PlanesList extends Component {
  static propTypes = {
    planesList: PropTypes.array.isRequired
  };

  state = {};

  render() {
    const { planesList } = this.props;

    return (
      <section className="planes-list">
        {planesList.map(({ code, rowsNumber, seatsInRow }, index) => (
          <section
            key={index}
            className="planes-list-item"
          >
            <div className="planes-list-item__header">
              <span className="planes-list-item__info">
                Code: <span className="planes-list-item__info-value">{code}</span>
              </span>
              <span className="planes-list-item__info">
                Rows number: <span className="planes-list-item__info-value">{rowsNumber}</span>
              </span>
            </div>

            <div className="planes-list-item__plane">
              <PlaneLayout
                rows={3}
                location={seatsInRow}
              />
            </div>

            <div className="planes-list-item__buttons-wrapper">
              <button type="button" className="button planes-list-item__buttons">
                Edit
                <FaPencilAlt className="planes-list-item__button-icon" />
              </button>
              <button type="button" className="button planes-list-item__buttons">
                Delete
                <FaTrashAlt className="planes-list-item__button-icon" />
              </button>
            </div>
          </section>
        ))}
      </section>
    )
  }
}

const mapStateToProps = state => ({
  planesList: state.planesData.planesList
});

export default connect(mapStateToProps)(PlanesList);
