import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuthentication } from './redux/system/actions';

import './App.scss';
import SideMenu from './components/side-menu';
import AirportPage from './components/airports';
import Login from './components/login';
import PrivateRoute from './components/private-route';

function MainContent() {
  return (
    <div className="app">
      <SideMenu />
      <div className="app-routes">
        <Switch>
          <Route path="/app/airports" component={AirportPage} />
        </Switch>
      </div>
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
  checkAuth: () => dispatch(checkAuthentication())
});

export default connect(null, mapDispatchToProps)(App);
