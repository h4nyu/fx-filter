import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Moment} from 'moment';
import styled from 'styled-components';
import {toNumber } from 'lodash';
import {Granularity, Segments, WeekDay } from '~/entities';
import GranularitySelector from './GranularitySelector';
import WeekDaySelector from './WeekDaySelector';
import DayPicker from '~/components/DayPicker';
import SegmentComponent from './Segment';
import SegmentHeader from './SegmentHeader';

interface IProps{
  apiKey: string;
  url: string;
  granularity: Granularity;
  fromDate: Moment,
  toDate: Moment,
  weekDays: WeekDay[],
  segments: Segments,
  CurrencyPairList: React.ComponentType<{}>;
  onKeyInput: (value:string) => void;
  onUrlInput: (value:string) => void;
  onToDateChange: (value:Moment) => void;
  onFromDateChange: (value:Moment) => void;
  onGranularityChange: (value:Granularity) => void;
  onWeekdayChange: (value:WeekDay) => void;
  onSubmit: () => void;
  onClear: () => void;
  onDelete: (id:string) => void;
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
    fromDate,
    toDate,
    segments,
    granularity,
    weekDays,
    onKeyInput, 
    onUrlInput,
    onFromDateChange,
    onToDateChange,
    onGranularityChange,
    onWeekdayChange,
    onSubmit,
    onClear,
    onDelete,
    CurrencyPairList,
  } = props;
  return (
    <div>
      <input className="input is-primary" type="text" placeholder="Backlog Url" onChange={(e) => onUrlInput(e.target.value)} value={url}/>
      <input className="input is-primary" type="text" placeholder="Api Key" onChange={(e) => onKeyInput(e.target.value)} value={apiKey}/>
      <CurrencyPairList/>
      <WeekDaySelector onChange={onWeekdayChange} values={weekDays} />
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
          <GranularitySelector onChange={onGranularityChange} value={granularity} />
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
