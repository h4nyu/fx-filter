import React from 'react';
import { observer } from 'mobx-react';
import CurrencyPairList from '~/components/CurrencyPairList';
import store from '~/store';


const Component = () => {
  return <CurrencyPairList />;
};
export default observer(Component);

