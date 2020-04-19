import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Moment} from 'moment';
import styled from 'styled-components';
import {toNumber } from 'lodash';
import DayPicker from '~/components/DayPicker';

interface IProps{
  apiKey: string;
  url: string;
  fromDate: Moment,
  toDate: Moment,
  CurrencyPairList: React.ComponentType<{}>;
  onKeyInput: (value:string) => void;
  onUrlInput: (value:string) => void;
  onToDateChange: (value:Moment) => void;
  onFromDateChange: (value:Moment) => void;
  onSubmit: () => void;
}
const Columns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
`;

const Column = styled.div`
  display: flex;
  flex-grow: 1;
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
    onKeyInput, 
    onUrlInput,
    onFromDateChange,
    onToDateChange,
    onSubmit,
    CurrencyPairList,
  } = props;
  return (
    <div>
      <input className="input is-primary" type="text" placeholder="Backlog Url" onChange={(e) => onUrlInput(e.target.value)} value={url}/>
      <input className="input is-primary" type="text" placeholder="Api Key" onChange={(e) => onKeyInput(e.target.value)} value={apiKey}/>
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
      <CurrencyPairList/>

      <div className="button" onClick={() => onSubmit()}> 検索 </div>
    </div>
  )
}

export default Component;
