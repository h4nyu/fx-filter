import React from 'react';
import { observer } from 'mobx-react';
import App from '~/components/App';
import store from '~/store';


const Component = () => {
  return <App 
    apiKey={store.apiKey}
    url={store.url}
    projectId={store.projectId}
    duration={store.duration}
    issues={store.issues}
    onKeyInput={store.setApiKey}
    onUrlInput={store.setUrl}
    onProjectIdInput={store.setProjectId}
    onDurationInput={store.setDuration}
    onSubmit={store.submit}
  />;
};
export default observer(Component);
