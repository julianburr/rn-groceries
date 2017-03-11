import React from 'react';
import { Text } from 'react-native';
import { storiesOf, action, linkTo } from '@kadira/react-native-storybook';

import Welcome from './welcome';
import NavigationHeader from 'components/navigation-header';

storiesOf('Groceries Storybook', module)
  .add('Welcome', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Navigation Header', module)
  .add('Default', () => (
    <NavigationHeader
      title='Hello World!'
    />
  ));