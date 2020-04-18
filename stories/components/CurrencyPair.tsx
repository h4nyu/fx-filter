import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from '~/components/CurrencyPairList';
import { object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';


const rows = [
  {
    name: "USD_SGD",
    displayName: "USD/SGD",
  },
  {
    name: "EUR_SEK",
    displayName: "EUR/SEK",
  },
]
storiesOf('CurrencyPair', module)
  .add('default', () => (
    <Component
      rows={object('rows', rows)}
    />
  ))

