import React from 'react';
import { storiesOf } from '@storybook/react';
import moment from 'moment';
import Component from '~/components/CandleList';
import { object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

const rows = [
  {
    mid:{
      o:10,
      c:20,
      h:30,
      l:400000000,
    },
    time: moment(),
    volume: 10000,
  },
  {
    mid:{
      o:10,
      c:20,
      h:30,
      l:40,
    },
    time: moment(),
    volume: 10000,
  },
]
storiesOf('CandleList', module)
  .add('default', () => (
    <Component
      rows={object('rows', rows)}
    />
  ))

