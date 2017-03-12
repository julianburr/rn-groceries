import { createStore } from 'redux';
import rootReducer from './reducers';

import { defaultState as test } from 'reducers/test';

const defaultState = {
  test
};

const store = createStore(rootReducer, defaultState);
export default store;