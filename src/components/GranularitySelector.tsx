import React from 'react';
import styled from 'styled-components';
import {Granularity } from '~/entities';
import PullDown from './PullDown'
import Select from 'react-select';
import Check from './Check';


const options = [
  { value: Granularity.D, label: '日足' },
  { value: Granularity.H1, label: '1時間足' },
  { value: Granularity.H4, label: '4時間足' },
  { value: Granularity.M15, label: '15分足' },
  { value: Granularity.M5, label: '5分足' },
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
  onChange: (value: Granularity) => void;
  values: Granularity[];
}
export default (props: IProps) => {
  const { onChange, values } = props;
  return (
    <Layout>
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
