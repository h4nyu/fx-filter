import React from 'react';
import { observer } from 'mobx-react';
import Loading from '~/components/Loading';
import {loadingStore} from '~/store';


const Component = () => {
  return <Loading 
    pendingNum={loadingStore.pendingNum} 
  />;
};
export default observer(Component);

