import React, { Component, PropTypes } from 'react';
import { View, ListView } from 'react-native'
import { autobind } from 'core-decorators';


@autobind
export default class ListView extends Component {
  render () {
    return (
      <ListView
        data={this.props.data}
      />
    );
  }
}