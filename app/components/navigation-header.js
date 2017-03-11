import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Platform, Dimensions } from 'react-native'
import { autobind } from 'core-decorators';

export const PADDING = Platform.OS === 'ios' ? 25 : 0;
export const HEIGHT = PADDING + 50;

const styles = StyleSheet.create({
  wrapper: {
    height: HEIGHT,
    width: Dimensions.get('window').width,
    paddingTop: PADDING,
    backgroundColor: 'yellow',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

@autobind
export default class NavigationHeader extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  static defaultProps = {};

  render () {
    return (
      <View style={styles.wrapper}>
        <View key='leftElements' />
        <View key='title'><Text>{this.props.title}</Text></View>
        <View key='rightElements' />
      </View>
    );
  }
}