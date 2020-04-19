import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from '~/components/GranularitySelecter';
import {Granularity} from '~/entities';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

storiesOf('GranularitySelecter', module)
  .add('default', () => (
    <Component 
      onChange={action('onChange')}
      value={Granularity.D}
    />
  ))

