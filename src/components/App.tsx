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

const Label = styled.div`
  font-weight: bold;
`
interface IProps{
  apiKey: string;
  url: string;
  filterValue: number | undefined; 
  granularity: Granularity;
  fromDate: Moment,
  toDate: Moment,
  weekDay: WeekDay | null,
  segments: Segments,
  onKeyInput: (value:string) => void;
  onUrlInput: (value:string) => void;
  onToDateChange: (value:Moment) => void;
  onFromDateChange: (value:Moment) => void;
  onGranularityChange: (value:Granularity) => void;
  onWeekdayChange: (value:WeekDay) => void;
  onSubmit: () => void;
  onClear: () => void;
  onDelete: (id:string) => void;
  onFilterInput: (value:number) => void;
  CurrencyPairList: React.ComponentType<{}>;
  Loading: React.ComponentType<{}>;
}

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
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
    weekDay,
    onKeyInput, 
    onUrlInput,
    onFromDateChange,
    onToDateChange,
    onGranularityChange,
    onWeekdayChange,
    onSubmit,
    onClear,
    onDelete,
    onFilterInput,
    CurrencyPairList,
    Loading,
  } = props;
  return (
    <div>
      <Label> Api Url </Label>
      <input className="input" type="text" placeholder="Backlog Url" onChange={(e) => onUrlInput(e.target.value)} value={url}/>

      <Label> Token </Label>
      <input className="input" type="text" placeholder="Api Key" onChange={(e) => onKeyInput(e.target.value)} value={apiKey}/>

      <Label> 通貨ペア </Label>
      <CurrencyPairList/>

      <Label> 曜日 </Label>
      <WeekDaySelector onChange={onWeekdayChange} value={weekDay} />
      <Columns>
        <Column>
          <Label> 期間 </Label>
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
          </Columns>
        </Column>
        <Column>
          <Label> ローソク足 </Label>
          <GranularitySelector onChange={onGranularityChange} value={granularity} />
        </Column>
        <Column>
          <div className="button is-full-width" onClick={() => onSubmit()}> 検索 </div>
        </Column>
      </Columns>

      <hr />

      <Label> 確率下限 </Label>
      <input className="input" type="number" step={0.01} placeholder="Filter" onChange={(e) => onFilterInput(+e.target.value)} value={filterValue}/>

      <SegmentHeader onClear={onClear}/>
      {segments.toList().map(x => <SegmentComponent key={x.id} row={x} onDelete={onDelete}/>)}
      <Loading/>
    </div>
  )
}

export default Component;
