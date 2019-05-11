import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import { FaPencilAlt, FaTimes, FaArrowUp } from 'react-icons/fa';
import { deleteAirport, changeAirport, setAirportsData } from '../../../redux/airports/actions';
import MaterialDialog from '../../material-components/dialog-window';
import TextField from '../../material-components/text-field';
import validate from './validate';
import styles from './material.style';
import './index.scss';

class AirportsList extends React.Component {
  static propTypes = {
    airportsList: PropTypes.array.isRequired,
    deleteAirport: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    changeAirport: PropTypes.func.isRequired,
    setAirportsData: PropTypes.func.isRequired,
  };

  state = {
    selectedAirportId: '',
    invertedByName: false,
    invertedByCode: true,
    sortingByName: true,
    sortingByCode: false
  };

  sortFunc = (field, order) => this.props.airportsList.sort((a, b) => {
    if (a[field] < b[field]) { return order ? 1 : -1; }
    if (a[field] > b[field]) { return order ? -1 : 1; }
    return 0;
  }).slice();

  sortByCode = async () => {
    await this.setState(state => ({
      invertedByName: true,
      invertedByCode: !state.invertedByCode,
      sortingByName: false,
      sortingByCode: true
    }));
    const sorted = this.sortFunc('code', this.state.invertedByCode);
    this.props.setAirportsData(sorted);
  };

  sortByName = async () => {
    await this.setState(state => ({
      invertedByCode: true,
      invertedByName: !state.invertedByName,
      sortingByName: true,
      sortingByCode: false
    }));
    const sorted = this.sortFunc('name', this.state.invertedByName);
    this.props.setAirportsData(sorted);
  };

  handleDeleteButtonClick = airportId => () => this.props.deleteAirport(airportId);

  handleChangeButtonClick = airportId => () => this.setState({ selectedAirportId: airportId });

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
                <FaArrowUp
                  className={classNames({
                    'airports-list__sort-arrow': true,
                    'airports-list__sort-arrow_inverted': this.state.invertedByCode,
                    'airports-list__sort-arrow_hidden': this.state.sortingByName
                  })}
                />
              </th>
              <th>
                <span
                  className="airports-list__column-name"
                  onClick={this.sortByName}
                >
                  name
                </span>
                <FaArrowUp
                  className={classNames({
                    'airports-list__sort-arrow': true,
                    'airports-list__sort-arrow_inverted': this.state.invertedByName,
                    'airports-list__sort-arrow_hidden': this.state.sortingByCode
                  })}
                />
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
                <td>
                  <MaterialDialog
                    title="Edit airport"
                    buttonComponent={(
                      <FaPencilAlt
                        className="airports-list__icon"
                        onClick={this.handleChangeButtonClick(_id)}
                      />
                    )}
                  >
                    <Form
                      onSubmit={this.onSubmit}
                      validate={validate}
                      initialValues={{
                        code,
                        airport: name
                      }}
                      render={({ handleSubmit }) => (
                        <form className="add-airport-form" onSubmit={handleSubmit}>
                          <Field
                            variant="outlined"
                            name="code"
                            label="Code"
                            value={code}
                            className={classes.texField}
                            component={TextField}
                          />
                          <Field
                            variant="outlined"
                            name="airport"
                            label="Airport"
                            className={classes.texField}
                            component={TextField}
                          />

                          <button className="button" type="submit">
                            Save changes
                          </button>
                        </form>
                      )}
                    />
                  </MaterialDialog>
                </td>
                <td>
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
  setAirportsData: airportsList => dispatch(setAirportsData(airportsList))
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AirportsList);
