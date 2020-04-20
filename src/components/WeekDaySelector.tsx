import React from 'react';
import styled from 'styled-components';
import {WeekDay, weekDayLabels } from '~/entities';
import PullDown from './PullDown'
import Select from 'react-select';
import Check from './Check';


const options = [
  WeekDay.Monday,
  WeekDay.Tuesday, 
  WeekDay.Wednesday,
  WeekDay.Thursday,
  WeekDay.Friday, 
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
  value: WeekDay | null;
}
export default (props: IProps) => {
  const { onChange, value } = props;
  return (
    <Layout className="card">
      {
        options.map((x:WeekDay) => {
          return (
            <Item key={x} onClick={() => onChange(x)}>
              <Check value={value === x} onClick={()=>{}}/>
              <Label>{weekDayLabels.get(x)}</Label>
            </Item>
          )
        })
      }
    </Layout>
  );
};
