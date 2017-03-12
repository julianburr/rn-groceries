import React, { Component, PropTypes } from 'react';
import { View, Text, ScrollView, ListView, StyleSheet } from 'react-native'
import { autobind } from 'core-decorators';
import NavigationHeader from 'components/navigation-header';

const styles = StyleSheet.create({
  card: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: 'yellow'
  }
});

@autobind
export default class Router extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    defaultKey: PropTypes.string
  };

  static ANIMATIONS = {};

  constructor (props) {
    super(props);
    this.state = {
      routes: props.defaultKey ? [props.routes[props.defaultKey]] : [props.routes[Object.keys(props.routes)[0]]]
    };
  }

  push (key) { // TODO: from
    this.setState({
      routes: [...this.state.routes].concat([this.props.routes[key]])
    });
  }

  pop () { // TODO distance, from
    let routes = [...this.state.routes];
    routes.splice(1, 1);
    this.setState({
      routes
    })
  }

  getRouterProps (route, index) {
    return {
      push: this.push,
      pop: this.pop,
      current: {
        route,
        index
      },
      routes: this.state.routes
    };
  }

  render () {
    return (
      <View style={{flex: 1}}>
        {this.state.routes.map((route, i) => {
          const routerProps = this.getRouterProps(route, i);
          const Screen = route.screen;
          return (
            <View key={`card-${i}`} style={[styles.card, {zIndex: (1000 + i)}]}>
              {route.header && (
                <NavigationHeader
                  title={route.header.title}
                  left={route.header.left}
                  right={route.header.right}
                  state={routerProps}
                />
              )}
              <View style={{flex: 1}}>
                <Screen
                  router={routerProps} 
                  {...route.props}
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}