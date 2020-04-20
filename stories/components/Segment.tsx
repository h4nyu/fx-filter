import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import Component from '~/components/Segment';
import {CurrencyPair, Direction, Granularity, WeekDay} from '~/entities';
import { object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

storiesOf('Segment', module)
  .add('default', () => {
    const segment = {
      id: 'aaa',
      currencyPair: CurrencyPair.EUR_JPY,
      granularity: Granularity.H1,
      direction: Direction.High,
      fromDate: moment(),
      toDate: moment().add(1, 'days'),
      ratio:0.7,
      count:1000,
      weekDay: null,
    }
    return (<Component
      row={object('row', segment)}
      onDelete={action('onDelete')}
    />)
  })
  .add('weekDay', () => {
    const segment = {
      id: 'aaa',
      currencyPair: CurrencyPair.EUR_JPY,
      granularity: Granularity.H1,
      direction: Direction.High,
      fromDate: moment(),
      toDate: moment().add(1, 'days'),
      ratio:0.7,
      count:1000,
      weekDay: WeekDay.Monday,
    }
    return (<Component
      row={object('row', segment)}
      onDelete={action('onDelete')}
    />)
  })
