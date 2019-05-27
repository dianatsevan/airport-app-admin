import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import airportsData from './airports/reducers';
import systemData from './system/reducers';
import planesData from './planes/reducers';
import flightsData from './flights/reducers';
import rootSaga from './sagas';

const rootReducer = combineReducers({
  airportsData,
  planesData,
  flightsData,
  systemData
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  return { store, persistor };
};
