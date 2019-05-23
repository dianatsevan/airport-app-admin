import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFlightsData } from '../../../redux/flights/actions';
import { FaPencilAlt, FaTimes, FaArrowUp } from 'react-icons/fa';
import AddFlightPopupContent from '../add-flight-popup/add-flight-popup-content';
import MaterialDialog from '../../material-components/dialog-window';

function FlightsList(props) {
  FlightsList.propTypes = {
    getFlightsData: PropTypes.func.isRequired,
    flightsList: PropTypes.array.isRequired,
  };

  useEffect(() => {
    props.getFlightsData();
  }, []);

  return (
    <section className="airports-list">

      <table className="airports-list__table">
        <thead>
          <tr className="airports-list__header">
            <th>#</th>
            <th>
              <span
                className="airports-list__column-name"
                // onClick={this.sortByCode}
              >
                Flight code
              </span>
              {/* <FaArrowUp className={this.codeArrowClassnames()} /> */}
            </th>
            <th>
              <span
                className="airports-list__column-name"
                // onClick={this.sortByName}
              >
                From
              </span>
              {/* <FaArrowUp className={this.nameArrowClassnames()} /> */}
            </th>
            <th>
              <span
                className="airports-list__column-name"
                // onClick={this.sortByName}
              >
                To
              </span>
              {/* <FaArrowUp className={this.nameArrowClassnames()} /> */}
            </th>
            <th>
              <span
                className="airports-list__column-name"
                // onClick={this.sortByName}
              >
                Departure time
              </span>
              {/* <FaArrowUp className={this.nameArrowClassnames()} /> */}
            </th>
            <th>
              <span
                className="airports-list__column-name"
                // onClick={this.sortByName}
              >
                Arrival time
              </span>
              {/* <FaArrowUp className={this.nameArrowClassnames()} /> */}
            </th>
            <th>
              <span
                className="airports-list__column-name"
                // onClick={this.sortByName}
              >
                Date
              </span>
              {/* <FaArrowUp className={this.nameArrowClassnames()} /> */}
            </th>

            <th />
            <th />
          </tr>
        </thead>
        <tbody className="airports-list__body">
          {props.flightsList.map(({ _id, code, name }, index) => (
            <tr
              key={_id}
              className="airports-list__item"
            >
              <td>{index + 1}</td>
              <td>{code}</td>
              <td>{name}</td>
              <td>{code}</td>
              <td>{name}</td>
              <td>{code}</td>
              <td>{name}</td>
              <td className="airports-list__action-icon">
                <MaterialDialog
                  title="Edit airport"
                  buttonComponent={(
                    <FaPencilAlt
                      className="airports-list__icon"
                      // onClick={this.handleChangeButtonClick(_id)}
                    />
                  )}
                >
                  <AddFlightPopupContent
                    // code={code}
                    // airport={name}
                    // // classes={classes}
                    // onSubmit={this.onSubmit}
                  />
                </MaterialDialog>
              </td>
              <td className="airports-list__action-icon">
                <FaTimes
                  className="airports-list__icon"
                  // onClick={this.handleDeleteButtonClick(_id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

const mapStateToProps = state => ({
  flightsList: state.flightsData.flightsList
});

const mapDispatchToProps = dispatch => ({
  getFlightsData: () => dispatch(getFlightsData())
});

export default connect(mapStateToProps, mapDispatchToProps)(FlightsList);
