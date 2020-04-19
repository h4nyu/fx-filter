import React from 'react';
import styled from 'styled-components';
import {Segment } from '~/entities';
import CandleList from './CandleList';


const Layout = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

const Column = styled.div`
    display: flex;
    flex-grow: 1;
    flex-basis: 0;
  `;


export interface IProps {
  onClear: () => void;
}
export default (props: IProps) => {
  const { onClear } = props;
  return (
    <Layout className="card">
      <Column>通貨ペア  </Column>
      <Column>方向      </Column>
      <Column>確率      </Column>
      <Column>ローソク足</Column>
      <Column>収集期間  </Column>
      <Column className="button" onClick={() => onClear()}>全削除</Column>
    </Layout>
  );
};