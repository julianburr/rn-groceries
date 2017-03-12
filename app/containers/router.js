import React, { Component, PropTypes } from 'react';
import { View, Text, ScrollView, ListView } from 'react-native'
import { autobind } from 'core-decorators';

@autobind
export default class Router extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    defaultRouteKey: PropTypes.string
  };

  static ANIMATIONS = {};

  constructor (props) {
    console.log('props.routes', props.routes)
    super(props);
    const firstRoute = props.routes[Object.keys(props.routes)[0]];
    this.state = {
      routes: props.defaultKey ? [props.routes[props.defaultKey]] : [firstRoute]
    };
  }

  push (key) { // TODO: from
    console.log('router.push', key, this.props.routes[key]);
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

  getComponent (component, state) {
    if (typeof component === 'function') {
      return component(state);
    }
    if (typeof component === 'string') {
      return <Text>{component}</Text>;
    }
    return component || null;
  }

  render () {
    console.log('this.state.routes', this.state.routes)
    return (
      <View style={{flex: 1}}>
        {this.state.routes.map((route, i) => {
          console.log('route', route)
          const routerProps = {
            push: this.push,
            pop: this.pop,
            current: {
              route,
              index: i,
            },
            routes: this.state.routes
          };
          return (
            <View key={`card-${i}`} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'yellow', zIndex: (1000 + i)}}>
              {route.header && (
                <View style={{left: 0, right: 0, top: 0, height: 75, backgroundColor: 'red',flexDirection: 'row', paddingTop: 25, alignItems: 'center', justifyContent: 'space-between'}}>
                  <View>{this.getComponent(route.header.left, routerProps)}</View>
                  <View>{this.getComponent(route.header.title, routerProps)}</View>
                  <View>{this.getComponent(route.header.right, routerProps)}</View>
                </View>
              )}
              <View style={{flex: 1}}>
                <route.screen router={routerProps} {...route.props} />
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}