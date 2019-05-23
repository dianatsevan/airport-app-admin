import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuth } from './redux/system/actions';

import './App.scss';
import AirportsPage from './components/airports';
import FlightsPage from './components/flights';
import FlightPage from './components/flights/flight-page';
import PlanesPage from './components/planes';
import SideMenu from './components/side-menu';
import Login from './components/login';
import PrivateRoute from './components/private-route';

function MainContent() {
  return (
    <div>
      <SideMenu>
        <Switch>
          <Route path="/app/airports" component={AirportsPage} />
          <Route exact path="/app/flights" component={FlightsPage} />
          <Route exact path="/app/flights/:id" component={FlightPage} />
          <Route path="/app/planes" component={PlanesPage} />
        </Switch>
      </SideMenu>
    </div>
  );
}

class App extends React.Component {
  static propTypes = {
    checkAuth: PropTypes.func.isRequired
  };

  componentDidMount = () => this.props.checkAuth();

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/app" />} />
            <PrivateRoute path="/app" component={MainContent} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  checkAuth: () => dispatch(checkAuth())
});

export default connect(null, mapDispatchToProps)(App);
