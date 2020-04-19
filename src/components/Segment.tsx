import React from 'react';
import styled from 'styled-components';
import {Segment } from '~/entities';
import CandleList from './CandleList';



const Layout = styled.div`
    display: flex;
    margin: 0.5em;
    flex-direction: column;
  `;


const HeaderLayout = styled.div`
    display: flex;
    align-items: space-between;
    justify-content: space-between;
    flex-basis: auto;
  `;

const CandleListLayout = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 300px;
  `;


export interface IProps {
  row: Segment,
}
export default (props: IProps) => {
  const { row } = props;
  const Header = () => {
    return <HeaderLayout className="card">
      <div>{row.currencyPair.replace("_", "/")}</div>
      <div>件数:{row.count}</div>
      <div>上げ確率:{row.upRatio}</div>
      <div>下げ確率:{row.downRatio}</div>
    </HeaderLayout>
  }
  return (
    <Layout className="card">
      <Header/>
      <CandleListLayout>
        <CandleList rows={row.candles}/>
      </CandleListLayout>
    </Layout>
  );
};
