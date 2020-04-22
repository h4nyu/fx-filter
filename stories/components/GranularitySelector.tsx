import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from '~/components/GranularitySelector';
import {Granularity} from '~/entities';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

storiesOf('GranularitySelector', module)
  .add('default', () => (
    <Component 
      onChange={action('onChange')}
      values={[Granularity.D]}
    />
  ))

