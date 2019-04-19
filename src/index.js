import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import ConfigureStore, { sagaMiddleware } from './redux/configureStore';
import { rootSaga } from './redux/airports/sagas';
import './index.scss';

const store = ConfigureStore();
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
