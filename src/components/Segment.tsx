import React from 'react';
import styled from 'styled-components';
import {Segment } from '~/entities';
import CandleList from './CandleList';

enum GranularityLabel {
  M5 = "5分足",
  H1 = "1時間足",
  D = "日足",
}

const Layout = styled.div`
    display: flex;
    padding: 0.25em;
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
  const label = GranularityLabel[row.granularity];
  const Header = () => {
    return (
      <HeaderLayout>
        <div>{row.currencyPair.replace("_", "/")}</div>
        <div>{row.direction}</div>
        <div>{row.ratio.toFixed(3)}</div>
        <div>{label}</div>
        <div>{row.fromDate.format('YYYY/MM/DD')} - {row.toDate.format('YYYY/MM/DD')}</div>
      </HeaderLayout>
    )
  }
  return (
    <Layout className="card">
      <Header/>
    </Layout>
  );
};
