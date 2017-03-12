import React, { Component } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import store from 'app/store';
import { autobind } from 'core-decorators';
import TestScreen from 'screens/test';

@autobind
export default class AppIndex extends Component {
  render () {
    return (
      <StoreProvider store={store}>
        <TestScreen />
      </StoreProvider>
    );
  }
}
