import React from 'react';
import { storiesOf } from '@kadira/react-native-storybook';

import Welcome from './welcome';
import NavigationHeader from 'components/navigation-header';

storiesOf('Groceries Storybook', module)
  .add('Welcome', () => (
    <Welcome />
  ));

storiesOf('Navigation Header', module)
  .add('Default', () => (
    <NavigationHeader
      title='Hello World!'
    />
  ));
