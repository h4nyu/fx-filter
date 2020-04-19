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
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `;

const Column = styled.div`
    display: flex;
    flex-grow: 1;
    flex-basis: 0;
  `;

export interface IProps {
  row: Segment,
}
export default (props: IProps) => {
  const { row } = props;
  const label = GranularityLabel[row.granularity];
  return (
    <Layout className="card">
      <Column>{row.currencyPair.replace("_", "/")}</Column>
      <Column>{row.direction}</Column>
      <Column>{row.ratio.toFixed(3)}</Column>
      <Column>{label}</Column>
      <Column>{row.fromDate.format('YYYY-MM-DD')} ~ {row.toDate.format('YYYY-MM-DD')}</Column>
      <Column className="button" onClick={() => console.log('aaa')}>削除</Column>
    </Layout>
  );
};
