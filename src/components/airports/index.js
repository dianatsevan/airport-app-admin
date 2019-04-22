import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAirportsData } from '../../redux/airports/actions';
import AddAirportForm from './add-airport';
import AirportsList from './airports-list';

class AirportPage extends React.Component {
  static propTypes = {
    getAirData: PropTypes.func.isRequired
  }

  componentDidMount = () => this.props.getAirData();

  render() {
    return (
      <section className="airport-page">
        <AddAirportForm />
        <AirportsList />
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getAirData: () => dispatch(getAirportsData())
});

export default connect(null, mapDispatchToProps)(AirportPage);
