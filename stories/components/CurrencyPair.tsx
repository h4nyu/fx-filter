import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from '~/components/CurrencyPairList';
import { object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';


storiesOf('CurrencyPair', module)
  .add('default', () => (
    <Component onChange={action("onChange")} values={[]}/>
  ))

