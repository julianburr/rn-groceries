import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export const HOME = 'app/home';
export const LIST = 'app/list';

export default {
  [HOME]: {
    header: {
      title: 'Your Lists',
      left: <Text>Menu</Text>,
      right: <Text>Search</Text>
    },
    screen: require('screens/home').default
  },

  [LIST]: {
    header: {
      title: 'Hello',
      left: state => (
        <TouchableOpacity onPress={state.pop}>
          <Text>Back</Text>
        </TouchableOpacity>
      ),
      right: null
    },
    screen: require('screens/list').default
  }
};
