import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from '~/components/Segment';
import {CurrencyPair} from '~/entities';
import { object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

storiesOf('Segment', module)
  .add('default', () => {
    const segment = {
      currencyPair: CurrencyPair.USD_JPY,
      candles: [],
      count: 1000,
      upRatio:0.3,
      downRatio:0.7,
    }
    return (<Component
      row={object('row', segment)}
    />)
  })

