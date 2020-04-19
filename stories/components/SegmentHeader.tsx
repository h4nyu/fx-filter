import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import Component from '~/components/SegmentHeader';
import Segment from '~/components/Segment';
import {CurrencyPair, Direction, Granularity} from '~/entities';
import { object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

storiesOf('SegmentHeader', module)
  .add('default', () => {
    const segment = {
      id: 'aaa',
      currencyPair: CurrencyPair.AUD_JPY,
      granularity: Granularity.H1,
      direction: Direction.High,
      fromDate: moment(),
      toDate: moment().add(1, 'days'),
      ratio:0.7,
    }
    return (
      <>
        <Component
          onClear={action('clear')}
        />
      </>
    )
  })
