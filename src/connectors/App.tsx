import React from 'react';
import { observer } from 'mobx-react';
import App from '~/components/App';
import CurrencyPairList from './CurrencyPairList'
import store from '~/store';


const Component = () => {
  return <App 
    apiKey={store.apiKey}
    url={store.url}
    fromDate={store.fromDate}
    toDate={store.toDate}
    onKeyInput={store.setApiKey}
    onUrlInput={store.setUrl}
    onFromDateChange={store.setFromDate}
    onToDateChange={store.setToDate}
    onSubmit={store.submit}
    CurrencyPairList={CurrencyPairList}
  />;
};
export default observer(Component);
