import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import './index.scss';

class AirportsList extends React.Component {
  static propTypes = {
    airportsList: PropTypes.array.isRequired,
  }

  render() {
    return (
      <section className="airports-list">
        <table className="airports-list__table">
          <tbody>
            <tr className="airports-list__header">
              <th>code</th>
              <th>name</th>
              <th></th>
              <th></th>
            </tr>
            {this.props.airportsList.map(({code, name}, index) => (
              <tr
                key={index}
                className="airports-list__item"
              >
                <td>{code}</td>
                <td>{name}</td>
                <td className="airports-list__icon">
                  <FaPencilAlt />
                </td>
                <td className="airports-list__icon">
                  <FaTimes />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  airportsList: state.airportsData.airportsList
});

export default connect(mapStateToProps)(AirportsList);