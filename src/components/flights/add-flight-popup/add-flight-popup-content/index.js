import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MenuItem from '@material-ui/core/MenuItem';
import { getAirportsData } from '../../../../redux/airports/actions';
import { getPlanesData } from '../../../../redux/planes/actions';
import DatePicker from '../../../material-components/date-picker';
import TimePicker from '../../../material-components/time-picker';
import TextField from '../../../material-components/text-field';
import Select from '../../../material-components/select';
import PlanesSelect from '../../../material-components/planes-select';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlaneLayout from './plane-layout';
import validate from './validate';
import styles from './material.style';
import '../../index.scss';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

class AddFlightPopupContent extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    getAirportsData: PropTypes.func.isRequired,
    airportsList: PropTypes.array.isRequired,
    planesList: PropTypes.array.isRequired,
    action: PropTypes.func.isRequired,
  };

  state = {
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sut', 'Sun']
  };

  onSubmit = values => console.log(values);
  // this.props.action(values);

  componentDidMount = () => this.props.getAirportsData();

  transformAirportsArray = () => this.props.airportsList.map(({ _id, name, code }) => ({
    label: `${name} ${code}`,
    id: _id
  }));

  drawMenuItems = () => this.props.planesList.map(({ _id, code, rowsNumber, seatsInRow }) => (
    <MenuItem
      style={{
        height: 'auto'
      }}
      key={_id}
      value={_id}
      divider
    >
      <div className="planes-list-item__header">
        <div>
          code: <b>{code}</b>
        </div>
        <div>
          Rows number: <b>{rowsNumber}</b>
        </div>
        <div>
          Plane layout:
        </div>

        <PlaneLayout
          rows={1}
          location={seatsInRow}
        />
      </div>
    </MenuItem>
  ));

  render() {
    const { classes } = this.props;

    return (
      <div className="add-flight-form-container">
        <Form
          onSubmit={this.onSubmit}
          validate={validate}
          mutators={{
            ...arrayMutators,
          }}
          render={({ handleSubmit, values }) => (
            <form className="add-flight-form" onSubmit={handleSubmit}>
              <Field
                name="code"
                label="Flight code"
                component={TextField}
                className={classes.textField}
                type="text"
                variant="outlined"
              />

              <Field
                name="fromCountry"
                label="From country"
                className={classes.selectField}
                component={Select}
                multiple={false}
                items={this.transformAirportsArray()}
              />

              <Field
                name="toCountry"
                label="To country"
                className={classes.selectField}
                component={Select}
                items={this.transformAirportsArray(values.fromCountry)}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="period-pickers-wrapper">
                  <Field
                    name="departureDate"
                    label="Departure date"
                    className={classes.dateTimePicker}
                    component={DatePicker}
                    variant="outlined"
                  />
                  <Field
                    name="arrivalDate"
                    label="Arrival date"
                    className={classes.dateTimePicker}
                    component={DatePicker}
                    variant="outlined"
                  />
                </div>
              </MuiPickersUtilsProvider>

              <ExpansionPanel className="exp-panel" style={{boxShadow: 'none', borderRadius: '3px'}}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{
                    paddingLeft: '13px',
                    height: '56px',
                    // coloe: 'gray'
                  }}
                >
                  <span>Schedule</span>
                </ExpansionPanelSummary>
                <div>
                  {this.state.daysOfWeek.map((elem, index) => (
                    <div
                      key={elem}
                      className="schedule-item"
                    >
                      <span>{elem}</span>
                      <Field
                        key={elem + index}
                        name="seats"
                        component="input"
                        type="checkbox"
                        className="checkbox"
                        value={index}
                      />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div className="pickers-wrapper">
                          <Field
                            name={`${elem}-departureTime`}
                            label="Departure time"
                            className={classes.dateTimePicker}
                            component={TimePicker}
                          />

                          <Field
                            name={`${elem}-arrivalTime`}
                            label="Arrival time"
                            className={classes.dateTimePicker}
                            component={TimePicker}
                          />
                        </div>
                      </MuiPickersUtilsProvider>
                    </div>
                  ))}
                </div>
              </ExpansionPanel>

              <Field
                name="price"
                label="Price $"
                component={TextField}
                className={classes.textField}
                type="text"
                variant="outlined"
              />

              <Field
                name="planeInfo"
                label="Plane"
                className={classes.selectField}
                component={PlanesSelect}
                kids={this.drawMenuItems()}
              />

              <button className="button" type="submit">
                Add
              </button>
            </form>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  airportsList: state.airportsData.airportsList,
  planesList: state.planesData.planesList
});

const mapDispatchToProps = dispatch => ({
  getAirportsData: () => dispatch(getAirportsData()),
  getPlanesData: () => dispatch(getPlanesData())
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AddFlightPopupContent);
