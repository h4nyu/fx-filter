import React from 'react';
import { observer } from 'mobx-react';
import CurrencyPairList from '~/components/CurrencyPairList';
import store from '~/store';


const Component = () => {
  return <CurrencyPairList 
    onChange={store.toggleCurrencyPairs} 
    values={store.currencyPairs}
  />;
};
export default observer(Component);
