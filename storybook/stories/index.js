import React from 'react';
import { Text } from 'react-native';
import { storiesOf, action, linkTo } from '@kadira/react-native-storybook';

import Welcome from './welcome';

storiesOf('Groceries Storybook', module)
  .add('Welcome', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));
