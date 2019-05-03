import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import airportsData from './airports/reducers';
import systemData from './user/reducers';
import { rootSaga } from './sagas';

const rootReducer = combineReducers({
  airportsData,
  systemData
});

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
