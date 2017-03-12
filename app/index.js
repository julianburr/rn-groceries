import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { Provider as StoreProvider } from 'react-redux';
import Router from 'containers/router';
import routes, { HOME } from 'app/routes';
import store from 'app/store';

@autobind
export default class AppIndex extends Component {
  render () {
    return (
      <StoreProvider store={store}>
        <Router routes={routes} defaultKey={HOME} />
      </StoreProvider>
    );
  }
}
