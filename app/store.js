import { createStore } from 'redux';
import rootReducer from './reducers';

import { defaultState as test } from 'reducers/test';

const defaultState = {
  test
};

console.log('defaultState', defaultState);
console.log('window.__REDUX_DEVTOOLS_EXTENSION__', global.reduxNativeDevTools)

const store = createStore(
  rootReducer, 
  defaultState, 
  global.reduxNativeDevTools && global.reduxNativeDevTools()
);

console.log('store', store)
export default store;