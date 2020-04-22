import React from 'react';
import styled from 'styled-components';
import {Segment, WeekDay,weekDayLabels } from '~/entities';
import CandleList from './CandleList';

enum GranularityLabel {
  M15 = "15分足",
  M5 = "5分足",
  H1 = "1時間足",
  H4 = "4時間足",
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
    white-space: nowrap;
  `;

export interface IProps {
  row: Segment;
  onDelete: (id:string) => void;
}
export default (props: IProps) => {
  const { row, onDelete } = props;
  const label = GranularityLabel[row.granularity];
  return (
    <Layout className="card">
      <Column>{row.currencyPair.replace("_", "/")}</Column>
      <Column>{row.direction}</Column>
      <Column>{row.ratio.toFixed(3)}</Column>
      <Column>{label}</Column>
      <Column>{row.fromDate.format('YYYY-MM-DD')}</Column>
      <Column>{row.toDate.format('YYYY-MM-DD')}</Column>
      <Column>{ row.weekDay === null? "なし": weekDayLabels.get(row.weekDay) }</Column>
      <Column>{row.count}</Column>
      <Column className="button" onClick={() => onDelete(row.id)}>削除</Column>
    </Layout>
  );
};
