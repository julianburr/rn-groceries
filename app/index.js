import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import Router from 'containers/router';
import routes, { HOME } from 'app/routes';

@autobind
export default class AppIndex extends Component {
  render () {
    return (
      <Router routes={routes} defaultKey={HOME} />
    );
  }
}
