import React from 'react';
import styled from 'styled-components';
import {WeekDay } from '~/entities';
import PullDown from './PullDown'
import Select from 'react-select';
import Check from './Check';


const options = [
  { value: WeekDay.Monday, label: '月' },
  { value: WeekDay.Tuesday, label: '火' },
  { value: WeekDay.Wednesday, label: '水' },
  { value: WeekDay.Thursday, label: '木' },
  { value: WeekDay.Friday, label: '金' },
];

const Layout = styled.div`
  display: flex;
  flex-direction: row; 
`
const Item = styled.div`
  cursor: pointer;
  margin: 0.5em;
  display: flex;
  flex-direction: row; 
`

const Label = styled.span`
  white-space: nowrap;
`

export interface IProps {
  onChange: (value: WeekDay) => void;
  values: WeekDay[];
}
export default (props: IProps) => {
  const { onChange, values } = props;
  return (
    <Layout className="card">
      {
        options.map(x => {
          return (
            <Item key={x.value} onClick={() => onChange(x.value)}>
              <Check value={values.includes(x.value)} onClick={()=>{}}/>
              <Label>{x.label}</Label>
            </Item>
          )
        })
      }
    </Layout>
  );
};
