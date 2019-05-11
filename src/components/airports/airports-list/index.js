import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { FaPencilAlt, FaTimes, FaArrowUp } from 'react-icons/fa';
import { deleteAirport, changeAirport, setAirportsData, getAirportsData } from '../../../redux/airports/actions';
import MaterialDialog from '../../material-components/dialog-window';
import DialogForm from './dialog-form';
import styles from './material.style';
import './index.scss';

class AirportsList extends React.Component {
  static propTypes = {
    airportsList: PropTypes.array.isRequired,
    deleteAirport: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    changeAirport: PropTypes.func.isRequired,
    getAirportsData: PropTypes.func.isRequired,
  };

  state = {
    selectedAirportId: '',
    invertedByName: false,
    invertedByCode: true,
    sortingByName: true,
    sortingByCode: false
  };

  sortByCode = async () => {
    await this.setState(state => ({
      invertedByName: true,
      invertedByCode: !state.invertedByCode,
      sortingByName: false,
      sortingByCode: true
    }));
    const values = {
      orderBy: 'code',
      direction: this.state.invertedByCode ? -1 : 1
    };
    this.props.getAirportsData(values);
  };

  sortByName = async () => {
    await this.setState(state => ({
      invertedByCode: true,
      invertedByName: !state.invertedByName,
      sortingByName: true,
      sortingByCode: false
    }));
    const values = {
      orderBy: 'name',
      direction: this.state.invertedByName ? -1 : 1
    };
    this.props.getAirportsData(values);
  };

  handleDeleteButtonClick = airportId => () => this.props.deleteAirport(airportId);

  handleChangeButtonClick = airportId => () => this.setState({ selectedAirportId: airportId });

  codeArrowClassnames = () => classNames({
    'airports-list__sort-arrow': true,
    'airports-list__sort-arrow_inverted': this.state.invertedByCode,
    'airports-list__sort-arrow_hidden': this.state.sortingByName
  });

  nameArrowClassnames = () => classNames({
    'airports-list__sort-arrow': true,
    'airports-list__sort-arrow_inverted': this.state.invertedByName,
    'airports-list__sort-arrow_hidden': this.state.sortingByCode
  });

  onSubmit = values => {
    const newValues = {
      ...values,
      airportId: this.state.selectedAirportId
    };

    this.props.changeAirport(newValues);
  };

  render() {
    const { classes } = this.props;

    return (
      <section className="airports-list">
        <table className="airports-list__table">
          <thead>
            <tr className="airports-list__header">
              <th>
                <span
                  className="airports-list__column-name"
                  onClick={this.sortByCode}
                >
                  code
                </span>
                <FaArrowUp className={this.codeArrowClassnames()} />
              </th>
              <th>
                <span
                  className="airports-list__column-name"
                  onClick={this.sortByName}
                >
                  name
                </span>
                <FaArrowUp className={this.nameArrowClassnames()} />
              </th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody className="airports-list__body">
            {this.props.airportsList.map(({ _id, code, name }) => (
              <tr
                key={_id}
                className="airports-list__item"
              >
                <td>{code}</td>
                <td>{name}</td>
                <td className="airports-list__action-icon">
                  <MaterialDialog
                    title="Edit airport"
                    buttonComponent={(
                      <FaPencilAlt
                        className="airports-list__icon"
                        onClick={this.handleChangeButtonClick(_id)}
                      />
                    )}
                  >
                    <DialogForm
                      code={code}
                      airport={name}
                      classes={classes}
                      onSubmit={this.onSubmit}
                    />
                  </MaterialDialog>
                </td>
                <td className="airports-list__action-icon">
                  <FaTimes
                    className="airports-list__icon"
                    onClick={this.handleDeleteButtonClick(_id)}
                  />
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

const mapDispatchToProps = dispatch => ({
  deleteAirport: airportId => dispatch(deleteAirport(airportId)),
  changeAirport: (airportData, airportId) => dispatch(changeAirport(airportData, airportId)),
  setAirportsData: airportsList => dispatch(setAirportsData(airportsList)),
  getAirportsData: data => dispatch(getAirportsData(data))
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AirportsList);
