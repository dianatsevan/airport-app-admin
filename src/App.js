import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../src/App.scss';
import SideMenu from './components/side-menu';
import AirportPage from './components/airports';

export default function App() {
  return (
    <Fragment>
      <Router>
        <div className="app">
          <SideMenu />
          <Switch>
            <Route path="/airports" component={AirportPage} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}
