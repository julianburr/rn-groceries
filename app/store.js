import { createStore, compose } from 'redux';
import rootReducer from './reducers';
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';

import { defaultState as test } from 'reducers/test';

// Set default state
const defaultState = {
  test
};

// Compose with redux dev tools whenever available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Define middleware here
const middleware = [
  offline(offlineConfig)
];

// Create redux store
const store = createStore(
  rootReducer, 
  defaultState, 
  composeEnhancers(...middleware)
);

export default store;