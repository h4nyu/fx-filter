import React from 'react';
import styled from 'styled-components';
import { CurrencyPair } from '~/entities';
import Check from './Check';


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
  flex-wrap: wrap;
  align-items: center;
`;
export interface IProps {
  onChange:(value:CurrencyPair) => void;
  values: CurrencyPair[];
}
export default (props: IProps) => {
  const {onChange, values} = props;
  const rows = Object.keys(CurrencyPair) as CurrencyPair[];
  return (
    <Layout className="card">
      {
        rows.map(x => 
          <Item key={x} onClick={() => {onChange(x)}}>
            <Check value={values.includes(x)} onClick={()=>{}}/>
            <span>{x.replace("_", "/")}</span>
          </Item>)
      }
    </Layout>
  );
};

