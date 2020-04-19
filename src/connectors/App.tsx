import React from 'react';
import { observer } from 'mobx-react';
import App from '~/components/App';
import CurrencyPairList from './CurrencyPairList'
import store from '~/store';


const Component = () => {
  return <App 
    apiKey={store.apiKey}
    url={store.url}
    filterValue={store.filterValue}
    granularity={store.granularity}
    fromDate={store.fromDate}
    toDate={store.toDate}
    weekDays={store.weekDays}
    segments={store.segments}
    onKeyInput={store.setApiKey}
    onUrlInput={store.setUrl}
    onFromDateChange={store.setFromDate}
    onToDateChange={store.setToDate}
    onGranularityChange={store.setGranularity}
    onWeekdayChange={store.toggleWeekday}
    onFilterInput={store.setFilterValue}
    onSubmit={store.submit}
    onClear={store.clear}
    onDelete={store.delete}
    CurrencyPairList={CurrencyPairList}
  />;
};
export default observer(Component);
