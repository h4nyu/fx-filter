import React from 'react';
import styled from 'styled-components';
import {Segment } from '~/entities';
import CandleList from './CandleList';

enum GranularityLabel {
  M15 = "15分足",
  M5 = "5分足",
  H1 = "1時間足",
  D = "日足",
}

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: auto;
  `;

const HeaderLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
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
        <div className="button" onClick={() => console.log('aaa')}>削除</div>
      </HeaderLayout>
    )
  }
  return (
    <Layout className="card">
      <Header/>
    </Layout>
  );
};
