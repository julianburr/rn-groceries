import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Platform, Dimensions } from 'react-native';
import { autobind } from 'core-decorators';

const styles = StyleSheet.create({
  wrapper: {
    left: 0, 
    right: 0, 
    top: 0, 
    height: 75, 
    backgroundColor: 'red',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },

  buttons: {
    top: 25,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 200
  },

  title: {
    position: 'absolute',
    top: 25,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100
  }
});

const elementPropType = PropTypes.oneOfType([
  PropTypes.func, 
  PropTypes.string, 
  PropTypes.element
]);

@autobind
export default class NavigationHeader extends Component {
  static propTypes = {
    title: elementPropType,
    left: elementPropType,
    right: elementPropType
  };

  getComponentFromProp (component, state) {
    if (typeof component === 'function') {
      return component(state);
    }
    if (typeof component === 'string') {
      return <Text>{component}</Text>;
    }
    return component || null;
  }

  render () {
    const { left, right, title, state } = this.props;
    return (
      <View style={styles.wrapper}>
        <View style={styles.buttons}>
          {this.getComponentFromProp(left, state)}
        </View>
        <View style={styles.buttons}>
          {this.getComponentFromProp(right, state)}
        </View>
        <View style={styles.title}>
          {this.getComponentFromProp(title, state)}
        </View>
      </View>
    );
  }
}
