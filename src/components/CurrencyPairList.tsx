import React from 'react';
import styled from 'styled-components';
import { CurrencyPair } from '~/entities';
import Check from './Check';

const options = [
  { value: CurrencyPair.USD_JPY, label: 'USD/JPY' },
  { value: CurrencyPair.EUR_JPY, label: 'EUR/JPY' },
  { value: CurrencyPair.AUD_JPY, label: 'AUD/JPY' },
];

const Item = styled.div`
  cursor: pointer;
  margin: 0.5em;
  display: flex;
  flex-direction: row; 
`
const Layout = styled.span`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export interface IProps {
  onChange:(value:CurrencyPair) => void;
  values: CurrencyPair[];
}
export default (props: IProps) => {
  const {onChange, values} = props;
  const rows = Object.keys(CurrencyPair)
  return (
    <Layout>
      {
        options.map(x => 
          <Item onClick={() => {onChange(x.value)}}>
            <Check value={values.includes(x.value)} onClick={()=>{}}/>
            <span>{x.label}</span>
          </Item>)
      }
    </Layout>
  );
};

