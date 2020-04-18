import React from 'react';
import { observer } from 'mobx-react';
import App from '~/components/App';
import CurrencyPairList from './CurrencyPairList'
import store from '~/store';


const Component = () => {
  return <App 
    apiKey={store.apiKey}
    url={store.url}
    accountId={store.accountId}
    duration={store.duration}
    issues={store.issues}
    onKeyInput={store.setApiKey}
    onUrlInput={store.setUrl}
    onAccountIdInput={store.setAccountId}
    onDurationInput={store.setDuration}
    onSubmit={store.submit}
    CurrencyPairList={CurrencyPairList}
  />;
};
export default observer(Component);
