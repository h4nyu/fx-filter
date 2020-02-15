import React from 'react';
import { observer } from 'mobx-react';
import App from '~/components/App';
import store from '~/store';


const Component = () => {
  return <App 
    issues={store.issues}
    onKeyInput={store.setApiKey}
    onUrlInput={store.setUrl}
    onSubmit={store.submit}
  />;
};
export default observer(Component);
