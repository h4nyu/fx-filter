import React from 'react';
import { observer } from 'mobx-react';
import App from '~/components/App';
import CurrencyPairList from './CurrencyPairList'
import Loading from './Loading';
import store from '~/store';


const Component = () => {
  return <App 
    apiKey={store.apiKey}
    url={store.url}
    filterValue={store.filterValue}
    granularities={store.granularities}
    fromDate={store.fromDate}
    toDate={store.toDate}
    weekDay={store.weekDay}
    segments={store.filterdSegments}
    onKeyInput={store.setApiKey}
    onUrlInput={store.setUrl}
    onFromDateChange={store.setFromDate}
    onToDateChange={store.setToDate}
    onGranularityChange={store.toggleGranularity}
    onWeekdayChange={store.toggleWeekday}
    onFilterInput={store.setFilterValue}
    onSubmit={store.submit}
    onClear={store.clear}
    onDelete={store.delete}
    onDownload={store.outputCsv}
    CurrencyPairList={CurrencyPairList}
    Loading={Loading}
  />;
};
export default observer(Component);
