import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideMenu from './components/side-menu';
import AirportPage from './components/airports';
import AddAirportPopup from './components/airports/add-airport-popup';
// import Login from './components/login';
import '../src/App.scss';

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
