import React from 'react';
import { observer } from 'mobx-react';
import App from '~/components/App';
import CurrencyPairList from './CurrencyPairList'
import store from '~/store';


const Component = () => {
  return <App 
    apiKey={store.apiKey}
    url={store.url}
    granularity={store.granularity}
    fromDate={store.fromDate}
    toDate={store.toDate}
    segments={store.segments}
    onKeyInput={store.setApiKey}
    onUrlInput={store.setUrl}
    onFromDateChange={store.setFromDate}
    onToDateChange={store.setToDate}
    onGranularityChange={store.setGranularity}
    onSubmit={store.submit}
    CurrencyPairList={CurrencyPairList}
  />;
};
export default observer(Component);
