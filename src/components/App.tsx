import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Moment} from 'moment';
import styled from 'styled-components';
import {toNumber } from 'lodash';
import {Granularity, Segments } from '~/entities';
import GranularitySelecter from './GranularitySelecter';
import DayPicker from '~/components/DayPicker';
import SegmentComponent from './Segment';
import SegmentHeader from './SegmentHeader';

interface IProps{
  apiKey: string;
  url: string;
  filterValue: number | undefined; 
  granularity: Granularity;
  fromDate: Moment,
  toDate: Moment,
  segments: Segments,
  CurrencyPairList: React.ComponentType<{}>;
  onKeyInput: (value:string) => void;
  onUrlInput: (value:string) => void;
  onToDateChange: (value:Moment) => void;
  onFromDateChange: (value:Moment) => void;
  onGranularityChange: (value:Granularity) => void;
  onSubmit: () => void;
  onClear: () => void;
  onDelete: (id:string) => void;
  onFilterInput: (value:number) => void;
}

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Component = (
  props: IProps,
) => {
  const {
    apiKey,
    url,
    filterValue,
    fromDate,
    toDate,
    segments,
    granularity,
    onKeyInput, 
    onUrlInput,
    onFromDateChange,
    onToDateChange,
    onGranularityChange,
    onSubmit,
    onClear,
    onDelete,
    onFilterInput,
    CurrencyPairList,
  } = props;
  return (
    <div>
      <input className="input is-primary" type="text" placeholder="Backlog Url" onChange={(e) => onUrlInput(e.target.value)} value={url}/>
      <input className="input is-primary" type="text" placeholder="Api Key" onChange={(e) => onKeyInput(e.target.value)} value={apiKey}/>
      <CurrencyPairList/>
      <Columns>
        <Column>
          <DayPicker value={fromDate} onChange={onFromDateChange}/>
        </Column>
        <Column>
          <i className="fas fa-arrows-alt-h"></i>
        </Column>
        <Column>
          <DayPicker value={toDate} onChange={onToDateChange}/>
        </Column>
        <Column>
          <GranularitySelecter onChange={onGranularityChange} value={granularity} />
        </Column>
        <Column>
          <input className="input" type="number" step={0.01} placeholder="Filter" onChange={(e) => onFilterInput(+e.target.value)} value={filterValue}/>
        </Column>
        <Column>
          <div className="button" onClick={() => onSubmit()}> 検索 </div>
        </Column>
      </Columns>
      <SegmentHeader onClear={onClear}/>
      {segments.toList().map(x => <SegmentComponent key={x.id} row={x} onDelete={onDelete}/>)}
    </div>
  )
}

export default Component;
