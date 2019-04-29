import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../src/App.scss';
import SideMenu from './components/side-menu';
import AirportPage from './components/airports';
import AddAirportPopup from './components/airports/add-airport-popup';

export default function App() {
  return (
    <div>
      <Router>
        <div className="app">
          <SideMenu />
          <div className="app-routes">
            <Switch>
              <Route path="/airports" component={AirportPage} />
              <Route path="/dialog" component={AddAirportPopup} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}
