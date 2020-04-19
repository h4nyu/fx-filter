import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from '~/components/DayPicker';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import moment from "moment";

storiesOf('DayPicker', module)
  .add('default', () => (
    <Component
      value={moment()}
      onChange={action('onChange')}
    />
  ))

