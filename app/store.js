import { createStore, compose } from 'redux';
import rootReducer from './reducers';
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';

import { defaultState as test } from 'reducers/test';

const defaultState = {
  test
};

console.log('defaultState', defaultState);
console.log('window.__REDUX_DEVTOOLS_EXTENSION__', global.reduxNativeDevTools)

const store = createStore(
  rootReducer, 
  defaultState, 
  compose(
    global.reduxNativeDevTools && global.reduxNativeDevTools(),
    offline(offlineConfig)
  )
);

console.log('store', store)
export default store;