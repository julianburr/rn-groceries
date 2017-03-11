import React from 'react';
import { View, Text } from 'react-native';

export default class Welcome extends React.Component {
  styles = {
    wrapper: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
    },
    header: {
      fontSize: 18,
      marginBottom: 18,
    },
    content: {
      fontSize: 12,
      marginBottom: 10,
      lineHeight: 18,
    },
  }

  showApp(e) {
    e.preventDefault();
    if(this.props.showApp) this.props.showApp();
  }

  render() {
    return (
      <View style={this.styles.wrapper}>
        <Text style={this.styles.header}>Welcome to the <Text style={{fontWeight: 'bold'}}>Groceries</Text> Storybook</Text>
        <Text style={this.styles.content}>This is a UI Component development environment for React Native components. Here I am building and improving my component library in a central space to have a quick overview of what I have and what I still need to create.</Text>
        <Text>It's also great to create different implementations for testing purposes of the same component :)</Text>
      </View>
    );
  }
}
